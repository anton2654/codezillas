from django.shortcuts import render
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Meal, Ingredient,MealIngredient
import json
from .serializers import MealSerializer,IngredientSerializer,MealIngredientSerializer,UserSerializer,ShoppingListSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# GET	Отримати дані (читання)
# POST	Створити новий запис
# PUT	Оновити всі поля об'єкта
# PATCH	Оновити деякі поля об'єкта
# DELETE	Видалити запис


@api_view(['GET'])
def get_meal(request, meal_id):
    try:
        meal = Meal.objects.get(id=meal_id)
        serializer = MealSerializer(meal)  # Перетворюємо у JSON
        return Response(serializer.data)
    except Meal.DoesNotExist:
        return Response({'error': 'Рецепт не знайдено'}, status=404)

@api_view(['GET'])
def get_ingredient(request, ingredient_id):
    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
        serializer = IngredientSerializer(ingredient)  # Перетворюємо у JSON
        return Response(serializer.data)
    except Ingredient.DoesNotExist:
        return Response({'error': 'Продукт не знайдено'}, status=404)

@api_view(['GET'])
def get_meal_ingredients(request,meal_id):
    try:
        meal_ingredients = MealIngredient.objects.filter(recipe_id=meal_id)
        serializer = MealIngredientSerializer(meal_ingredients, many=True)
        
        return Response(serializer.data)
    
    except MealIngredient.DoesNotExist:
        return Response({'error': 'Рецепт не знайдено'}, status=404)    

@api_view(['GET'])
def get_meals(request):
    meals=Meal.objects.all()
    serializer=MealSerializer(meals,many=True)
    return Response(serializer.data)

# @api_view(['POST'])
# def create_meal(request):
#     serializer = MealSerializer(data=request.data)  # Беремо JSON з запиту
#     if serializer.is_valid():
#         serializer.save()  # Зберігаємо в БД
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)

# def calculate_total_nutrition(request, meal_id):
#     meal = get_object_or_404(Meal, meal_id=meal_id)  # Отримуємо страву з БД

#     if not meal.ingredients:
#         return JsonResponse({"error": "No ingredients found for this meal_id"}, status=404)

#     ingredients = json.loads(meal.ingredients)  # Розбираємо JSON з інгредієнтами

#     total_calories = 0
#     total_fat = 0
#     total_protein = 0
#     total_carbohydrates = 0

#     for ingredient in ingredients:
#         product_id = ingredient.get("product_id")
#         quantity = ingredient.get("quantity", 0)  # Грамів у рецепті

#         if not product_id or quantity <= 0:
#             continue

#         product = Product.objects.filter(product_id=product_id).first()  # Отримуємо продукт

#         if product:
#             total_calories += product.calories * (quantity / 100)
#             total_fat += product.fat * (quantity / 100)
#             total_protein += product.protein * (quantity / 100)
#             total_carbohydrates += product.carbohydrates * (quantity / 100)

#     return JsonResponse({
#         "calories": round(total_calories, 2),
#         "fat": round(total_fat, 2),
#         "protein": round(total_protein, 2),
#         "carbohydrates": round(total_carbohydrates, 2),
#     })
