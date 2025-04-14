from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Recipe, Ingredient, RecipeIngredient, ShoppingList,UserMenu, RecipeIngredientUser,Recipe_User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name']

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
    #ingredient = IngredientSerializer(read_only=True)
    #user = UserSerializer(read_only=True) 
    ingredient = IngredientSerializer()
    quantity = serializers.FloatField()

    class Meta:
        model = UserMenu
        fields = ["ingredient", "quantity"]

class ShoppingListSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = ShoppingList
        fields = '__all__'

class Recipe_User_IngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True) 

    class Meta:
        model = RecipeIngredientUser
        fields = '__all__'

class RecipeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe_User
        fields = '__all__'