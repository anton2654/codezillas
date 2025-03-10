from rest_framework import serializers
from rest_framework import serializers
from .models import User, Meal, Ingredient, MealIngredient, Fridge, ShoppingList

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # ['id', 'email', 'name']

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class MealIngredientSerializer(serializers.ModelSerializer):
    #recipe = MealSerializer(read_only=True)  
    ingredient = IngredientSerializer(read_only=True) 

    class Meta:
        model = MealIngredient
        fields = '__all__'

class FridgeSerializer(serializers.ModelSerializer):
    recipe = MealSerializer(read_only=True)
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Fridge
        fields = '__all__'

class ShoppingListSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = ShoppingList
        fields = '__all__'
