from django.db import models

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.


class User(models.Model):
    email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    calorie_norm = models.IntegerField(blank=True, null=True)
    diet_type = models.CharField(max_length=255, blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    food_preferences = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'User'


class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    calories = models.IntegerField()
    proteins = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'ingredient'


class Meal(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    calories = models.IntegerField()
    proteins = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'recipe'


class MealIngredient(models.Model):
    recipe = models.OneToOneField(Meal, models.DO_NOTHING, primary_key=True)  # The composite primary key (recipe_id, ingredient_id) found, that is not supported. The first column is selected.
    ingredient = models.ForeignKey(Ingredient, models.DO_NOTHING)
    quantity = models.FloatField()

    def __str__(self):
        return f"{self.recipe.name} -> {self.ingredient.name}"

    class Meta:
        managed = False
        db_table = 'recipe_ingredient'
        unique_together = (('recipe', 'ingredient'),)


class ShoppingList(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    ingredient = models.ForeignKey(Ingredient, models.DO_NOTHING, blank=True, null=True)
    quantity = models.FloatField()
    in_stock = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shopping_list'


class Fridge(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    recipe = models.ForeignKey(Meal, models.DO_NOTHING, blank=True, null=True)
    menu_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'user_menu'
