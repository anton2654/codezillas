from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from rest_framework.views import APIView
from .views import (get_meal,get_ingredient, get_meal_ingredients,get_meals, calculate_total_nutrition,
                    get_ingredient_categories,get_ingredients,create_meal,create_user,add_ingredients_to_meal,
                    get_user, get_fridge,get_fridge_ingredient, get_meal_categories,add_ingredient_into_fridge)
from rest_framework.response import Response

class APIRootView(APIView):
    def get(self, request, *args, **kwargs):

        data = {
            #MEAL
            'meal': 'http://127.0.0.1:8000/api/meal/<meal_id>',
            'all_meals':'http://127.0.0.1:8000/api/meal/all/',
            'meal_ingredients': 'http://127.0.0.1:8000/api/meal/ingredients/<meal_id>/',  
            'calculate_nutrition':'http://127.0.0.1:8000/api/meal/calculate_nutrition/<meal_id>/',
            'create_meal':'http://127.0.0.1:8000/api/meal/create/',
            'add_ingredients_to_meal': 'http://127.0.0.1:8000/api/meal/add_ingredients/<meal_id>/',
            'get_meal_categories':'http://127.0.0.1:8000/api/meal/categories',

            #INGREDIENT
            'ingredient': 'http://127.0.0.1:8000/api/ingredient/<ingredient_id>/',
            'all_ingredients': 'http://127.0.0.1:8000/api/ingredient/all/',
            'ingredients_categories': 'http://127.0.0.1:8000/api/ingredient/categories/',

            #USER
            'get_user': 'http://127.0.0.1:8000/api/user/<user_id>/',
            'create_user': 'http://127.0.0.1:8000/api/user/create/',

            #FRIDGE
            'get_fridge':'http://127.0.0.1:8000/api/user/<user_id>/fridge/',
            'get_fridge_ingredient':'http://127.0.0.1:8000/api/user/<user_id>/fridge/<ingredient_id>',
            #'add_ingredient_into_fridge':'http://127.0.0.1:8000/api/user/fridge/add/',

        }
        return Response(data)
    
router = DefaultRouter()

urlpatterns = [
    path('',APIRootView.as_view(), name='api-root'),

    #MEAL
    path('meal/<int:meal_id>/', get_meal),
    path('meal/all/',get_meals),
    path('meal/ingredients/<int:meal_id>/', get_meal_ingredients),
    path('meal/calculate_nutrition/<int:meal_id>/',calculate_total_nutrition),
    path('meal/create/',create_meal),
    path('meal/add_ingredients/<int:meal_id>/',add_ingredients_to_meal),
    path('meal/categories/',get_meal_categories),

    #INGREDIENT
    path('ingredient/<int:ingredient_id>/',get_ingredient),
    path('ingredient/all/',get_ingredients),
    path('ingredient/categories/',get_ingredient_categories),

    #USER
    path('user/create/',create_user),
    path('user/<user_id>', get_user),


    #FRIDGE
    path('user/<user_id>/fridge/',get_fridge),
    path('user/<user_id>/fridge/<ingredient_id>/',get_fridge_ingredient ),
    path('user/fridge/add/',add_ingredient_into_fridge),

 ]
