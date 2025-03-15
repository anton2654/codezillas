from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Recipe, Ingredient, RecipeIngredient, ShoppingList,UserMenu

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'name']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class MealIngredientSerializer(serializers.ModelSerializer):
    #recipe = MealSerializer(read_only=True)  
    ingredient = IngredientSerializer(read_only=True) 

    class Meta:
        model = RecipeIngredient
        fields = '__all__'

class FridgeSerializer(serializers.ModelSerializer):
    recipe = MealSerializer(read_only=True)
    user = UserSerializer(read_only=True) 

    class Meta:
        model = UserMenu
        fields = '__all__'

class ShoppingListSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = ShoppingList
        fields = '__all__'
