from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import get_meal,get_ingredient, get_meal_ingredients,get_meals


router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('meal/<int:meal_id>/', get_meal),
    path('ingredient/<int:ingredient_id>/',get_ingredient),
    path('meal_ingredients/<int:meal_id>/', get_meal_ingredients),
    path('all_meals/',get_meals),
]
