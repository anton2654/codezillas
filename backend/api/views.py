from django.shortcuts import render
from django.conf import settings
from rest_framework import viewsets, generics
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Recipe, Ingredient,RecipeIngredient,UserMenu,User,Recipe_User,RecipeIngredientUser
import json
from decimal import Decimal
from .serializers import (MealSerializer,IngredientSerializer,MealIngredientSerializer,
                          UserSerializer,ShoppingListSerializer,FridgeSerializer,
                          MyTokenObtainPairSerializer, RegisterSerializer, Recipe_User_IngredientSerializer,RecipeUserSerializer)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework_simplejwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken
# GET	Отримати дані (читання)
# POST	Створити новий запис
# PUT	Оновити всі поля об'єкта
# PATCH	Оновити деякі поля об'єкта
# DELETE	Видалити запис


#TODO 
#PATCH add_calculated_nutrition_into_recipe





#==============================================================
#MEAL

@api_view(['GET'])
def get_meal(request, meal_id):
    try:
        meal = Recipe.objects.get(id=meal_id)
        serializer = MealSerializer(meal)
        return Response(serializer.data)
    except RecipeIngredient.DoesNotExist:
        return Response({'error': 'Рецепт не знайдено'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_meal_ingredients(request,meal_id):
    try:
        meal_ingredients = RecipeIngredient.objects.filter(recipe=meal_id)
        serializer = MealIngredientSerializer(meal_ingredients, many=True)
        
        return Response(serializer.data)
    
    except RecipeIngredient.DoesNotExist:
        return Response({'error': 'Рецепт не знайдено'}, status=status.HTTP_404_NOT_FOUND)    

@api_view(['GET'])
def get_meals(request):
    try:
        meals = Recipe.objects.all()
        if not meals.exists():
            return Response({'error': 'Рецепти не знайдено'}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = MealSerializer(meals, many=True)
        return Response(serializer.data)
    
    except Exception as e:
        return Response({'error': f'Помилка сервера: {str(e)}'}, status=500)


@api_view(['POST'])
def create_meal(request):
    serializer = MealSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_meal_categories(request):
    categories = Recipe.objects.values_list('category', flat=True).distinct()
    return Response({'categories': list(categories)})


@api_view(['POST'])
def add_ingredients_to_meal(request, meal_id):
    try:
        recipe = Recipe.objects.get(id=meal_id)
    except Recipe.DoesNotExist:
        return Response({'error': 'Рецепт не знайдено'}, status=status.HTTP_404_NOT_FOUND)

    ingredients = request.data.get('ingredients')

    if not ingredients or not isinstance(ingredients, list):
        return Response({'error': 'Необхідно передати список інгредієнтів'}, status=status.HTTP_400_BAD_REQUEST)

    added_ingredients = []
    errors = []

    for item in ingredients:
        ingredient_id = item.get('ingredient')
        quantity = item.get('quantity')

        if not ingredient_id or not quantity:
            errors.append({'ingredient': ingredient_id, 'error': 'Відсутній ingredient або quantity'})
            continue

        try:
            ingredient = Ingredient.objects.get(id=ingredient_id)
        except Ingredient.DoesNotExist:
            errors.append({'ingredient': ingredient_id, 'error': 'Інгредієнт не знайдено'})
            continue

        # Створюємо або оновлюємо зв’язок RecipeIngredient
        recipe_ingredient, created = RecipeIngredient.objects.update_or_create(
            recipe=recipe,
            ingredient=ingredient,
            defaults={'quantity': quantity}
        )

        added_ingredients.append(MealIngredientSerializer(recipe_ingredient).data)

    response_data = {"added_ingredients": added_ingredients}
    if errors:
        response_data["errors"] = errors

    return Response(response_data, status=status.HTTP_201_CREATED if added_ingredients else status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def calculate_total_nutrition(request, meal_id):
    try:
        meal_ingredients = RecipeIngredient.objects.filter(recipe=meal_id)
        if not meal_ingredients.exists():
            return Response({'error': 'Рецепт не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = MealIngredientSerializer(meal_ingredients, many=True)
        ingredients = serializer.data

        if not ingredients:
            return Response({"error": "Не знайдено інгредієнтів до рецепта"}, status=status.HTTP_404_NOT_FOUND)

        total_calories = 0
        total_fat = 0
        total_protein = 0
        total_carbohydrates = 0

        for ingredient in ingredients:
            quantity = ingredient.get('quantity', 0) 
            product = ingredient.get('ingredient', {})

            total_calories += product.get('calories', 0) * (quantity / 100)
            total_fat += product.get('fats', 0) * (quantity / 100)
            total_protein += product.get('proteins', 0) * (quantity / 100)
            total_carbohydrates += product.get('carbohydrates', 0) * (quantity / 100)

        return Response({
            "calories": round(total_calories, 2),
            "fats": round(total_fat, 2),
            "proteins": round(total_protein, 2),
            "carbohydrates": round(total_carbohydrates, 2),
        })

    except Exception as e:
        return Response({'error': f'Помилка сервера: {str(e)}'}, status=500)



#================================================================
#INGREDIENT

@api_view(['GET'])
def get_ingredient(request, ingredient_id):
    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
        serializer = IngredientSerializer(ingredient)
        return Response(serializer.data)
    except Ingredient.DoesNotExist:
        return Response({'error': 'Продукт не знайдено'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_ingredients(request):
    try:
        ingredients=Ingredient.objects.all()
        if not ingredients.exists():
            return Response({'error': 'Інгредієнтів не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        serializer=IngredientSerializer(ingredients,many=True)
        return Response(serializer.data)
    
    except Exception as e:
        return Response({'error': f'Помилка сервера: {str(e)}'}, status=500)

@api_view(['GET'])
def get_ingredient_categories(request):
    categories = Ingredient.objects.values_list('category', flat=True).distinct()
    return Response({'categories': list(categories)})

#================================================================
#USER
class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        response = Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access_token',
            value=str(access_token),
            httponly=True,
            secure=False, # change to True on prod
            samesite='Lax',
            max_age=api_settings.ACCESS_TOKEN_LIFETIME.total_seconds()
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=api_settings.REFRESH_TOKEN_LIFETIME.total_seconds()
        )
        return response

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        response = Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        response.set_cookie(
            key='access_token',
            value=str(access_token),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=api_settings.ACCESS_TOKEN_LIFETIME.total_seconds()
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=api_settings.REFRESH_TOKEN_LIFETIME.total_seconds()
        )
        return response

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name or '',
        }
        return Response(user_data, status=status.HTTP_200_OK)


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            raise InvalidToken('No refresh token found in cookies')

        serializer = self.get_serializer(data={'refresh': refresh_token})
        serializer.is_valid(raise_exception=True)
        access_token = serializer.validated_data['access']

        response = Response({"message": "Token refreshed successfully"}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=api_settings.ACCESS_TOKEN_LIFETIME.total_seconds()
        )
        return response

@api_view(['GET'])
def get_user(request,user_id):
    try:
        user= User.objects.get(id=user_id)
        serializer=UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Користувач створений'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PATCH'])
# def change_characteristics(request):


#================================================================
#USER_RECIPES

# @api_view(['GET'])
# def get_user_meal_ingredients(request,meal_id):
#     try:
#         meal_ingredients = RecipeIngredientUser.objects.filter(recipe=meal_id)
#         serializer = Recipe_User_IngredientSerializer(meal_ingredients, many=True)
        
#         return Response(serializer.data)
    
#     except RecipeIngredientUser.DoesNotExist:
#         return Response({'error': 'Рецепт не знайдено'}, status=status.HTTP_404_NOT_FOUND)    

@api_view(['GET'])
def get_user_meals(request,user_id):
    try:
        try:
            user=User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        
        meals = Recipe_User.objects.filter(user=user_id)
        if not meals.exists():
            return Response({'error': 'Рецепти не знайдено'}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = RecipeUserSerializer(meals, many=True)
        return Response(serializer.data)
    
    except Exception as e:
        return Response({'error': f'Помилка сервера: {str(e)}'}, status=500)


@api_view(['POST'])
def create_user_meal(request, user_id):
    try:
        User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)

    request_data = request.data.copy()
    request_data['user'] = user_id
    serializer = RecipeUserSerializer(data=request_data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_ingredients_to_user_meal(request, meal_id,user_id):
    try:
        recipe = Recipe_User.objects.get(id=meal_id,user=user_id)
    except Recipe_User.DoesNotExist:
        return Response({'error': 'Рецепт не знайдено'}, status=status.HTTP_404_NOT_FOUND)

    ingredients = request.data.get('ingredients')

    if not ingredients or not isinstance(ingredients, list):
        return Response({'error': 'Необхідно передати список інгредієнтів'}, status=status.HTTP_400_BAD_REQUEST)

    added_ingredients = []
    errors = []

    for item in ingredients:
        ingredient_id = item.get('ingredient')
        quantity = item.get('quantity')

        if not ingredient_id or not quantity:
            errors.append({'ingredient': ingredient_id, 'error': 'Відсутній ingredient або quantity'})
            continue

        try:
            ingredient = Ingredient.objects.get(id=ingredient_id)
        except Ingredient.DoesNotExist:
            errors.append({'ingredient': ingredient_id, 'error': 'Інгредієнт не знайдено'})
            continue

        # Створюємо або оновлюємо зв’язок RecipeIngredient
        recipe_ingredient, created = RecipeIngredientUser.objects.update_or_create(
            recipe_user=recipe,
            ingredient=ingredient,
            defaults={'quantity': quantity}
        )

        added_ingredients.append(Recipe_User_IngredientSerializer(recipe_ingredient).data)

    response_data = {"added_ingredients": added_ingredients}
    if errors:
        response_data["errors"] = errors

    return Response(response_data, status=status.HTTP_201_CREATED if added_ingredients else status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_meal_ingredients(request,meal_id,user_id):
    try:
        meal_ingredients = RecipeIngredientUser.objects.filter(recipe_user=meal_id)
        serializer = Recipe_User_IngredientSerializer(meal_ingredients, many=True)
        
        return Response(serializer.data)
    
    except RecipeIngredientUser.DoesNotExist:
        return Response({'error': 'Рецепт не знайдено'}, status=status.HTTP_404_NOT_FOUND)    


#================================================================
#FRIDGE

@api_view(['GET'])
def get_fridge(request,user_id):
    try:
        user=User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)


    fridge_ingredients = UserMenu.objects.filter(user=user)

    if not fridge_ingredients.exists():
        return Response({'error': 'Холодильник порожній або не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        
    serializer = FridgeSerializer(fridge_ingredients, many=True)       
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_fridge_ingredient(request,user_id,ingredient_id):
    try:
        user=User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        ingredient = UserMenu.objects.get(ingredient=ingredient_id, user=user)
        serializer = FridgeSerializer(ingredient)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except UserMenu.DoesNotExist:
        return Response({'error': 'Продукт не знайдено у холодильнику'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def add_ingredient_into_fridge(request,user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)

    ingredients = request.data.get('ingredients')

    if not ingredients or not isinstance(ingredients, list):
        return Response({'error': 'Необхідно передати список інгредієнтів'}, status=status.HTTP_400_BAD_REQUEST)

    added_ingredients = []
    errors = []

    for item in ingredients:
        ingredient_id = item.get('ingredient')
        quantity = item.get('quantity')

        if not ingredient_id or not quantity:
            errors.append({'ingredient': ingredient_id, 'error': 'Відсутній ingredient або quantity'})
            continue

        try:
            ingredient = Ingredient.objects.get(id=ingredient_id)
        except Ingredient.DoesNotExist:
            errors.append({'ingredient': ingredient_id, 'error': 'Інгредієнт не знайдено'})
            continue

        fridge_item, created = UserMenu.objects.get_or_create(user=user, ingredient=ingredient, defaults={'quantity': quantity})
        
        if not created:
            fridge_item.quantity += Decimal(str(quantity))
            fridge_item.save()
        
        added_ingredients.append(FridgeSerializer(fridge_item).data)

    response_data = {"added_ingredients": added_ingredients}
    if errors:
        response_data["errors"] = errors

    return Response(response_data, status=status.HTTP_201_CREATED if added_ingredients else status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def remove_ingredient_from_fridge(request, user_id, ingredient_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)

    try:
        user_menu_item = UserMenu.objects.get(user=user, ingredient_id=ingredient_id)
        user_menu_item.delete()
        return Response({'message': 'Інгредієнт видалено'}, status=status.HTTP_200_OK)
    except UserMenu.DoesNotExist:
        return Response({'error': 'Інгредієнт не знайдено у холодильнику'}, status=status.HTTP_404_NOT_FOUND)
   

@api_view(['PATCH'])
def change_ingredient_quantity(request, user_id, ingredient_id):
    try:
        user_menu_item = UserMenu.objects.get(ingredient_id=ingredient_id, user_id=user_id)
    except UserMenu.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    new_quantity = request.data.get("quantity")
    if new_quantity is None:
        return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

    user_menu_item.quantity = new_quantity
    user_menu_item.save()
    
    return Response(FridgeSerializer(user_menu_item).data, status=status.HTTP_200_OK)



@api_view(['GET'])
def menu_generator(request,user_id):
    try:
        user=User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)


    fridge_ingredients = UserMenu.objects.filter(user=user)

    if not fridge_ingredients.exists():
        return Response({'error': 'Холодильник порожній або не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        
    try:
        meals = Recipe.objects.all()
        if not meals.exists():
            return Response({'error': 'Рецепти не знайдено'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': f'Помилка сервера: {str(e)}'}, status=500)
    
    dict_fridge_ingr={}
    
    for fridge_ingredient in fridge_ingredients:
        dict_fridge_ingr[fridge_ingredient.ingredient.id]=fridge_ingredient.quantity

    ingredients_available_meals=[]
    available_meals=[]
    errors=[]
    for meal in meals:
        meal_ingredients = RecipeIngredient.objects.filter(recipe=meal)

        if not meal_ingredients.exists():
            errors.append({'Recipe':meal.id , 'error': 'Не знайдено інградієнтів до рецепту'})
            continue

        if len(fridge_ingredients) < len(meal_ingredients):
            continue

        dict_meal_ingr = {meal_ingredient.ingredient.id: meal_ingredient.quantity for meal_ingredient in meal_ingredients}

        is_available_meal=True
        is_ingr_available_meal=True
        for id_ingr, quantity_ingr in dict_meal_ingr.items():
            if id_ingr not in dict_fridge_ingr or dict_fridge_ingr[id_ingr] < quantity_ingr:
                is_available_meal=False
                if id_ingr not in dict_fridge_ingr:
                    is_ingr_available_meal=False

        meal_data = MealSerializer(meal).data

        if is_available_meal:
            available_meals.append(meal_data)
        elif is_ingr_available_meal:
            ingredients_available_meals.append(meal_data)    
                

        
    response_data={'available meals': available_meals, 'ingredient available meals': ingredients_available_meals}    
    if errors:
        response_data["errors"] = errors

    return Response(response_data, status=status.HTTP_201_CREATED)



            
