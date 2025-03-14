from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from rest_framework.views import APIView
from .views import (get_meal,get_ingredient, get_meal_ingredients,get_meals, calculate_total_nutrition,
                    get_ingredient_categories,get_ingredients,create_meal,create_user,add_ingredient_to_meal)
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
            'add_ingredient_to_meal': 'http://127.0.0.1:8000/api/meal/add_ingredient/<meal_id>/',

            #INGREDIENT
            'ingredient': 'http://127.0.0.1:8000/api/ingredient/<ingredient_id>/',
            'all_ingredients': 'http://127.0.0.1:8000/api/ingredient/all/',
            'ingredients_categories': 'http://127.0.0.1:8000/api/ingredient/categories/',

            #USER
            'create_user': 'http://127.0.0.1:8000/api/user/create/',

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
    path('meal/add_ingredient/<int:meal_id>/',add_ingredient_to_meal),

    #INGREDIENT
    path('ingredient/<int:ingredient_id>/',get_ingredient),
    path('ingredient/all/',get_ingredients),
    path('ingredient/categories/',get_ingredient_categories),

    #USER
    path('user/create/',create_user)
    

 ]
