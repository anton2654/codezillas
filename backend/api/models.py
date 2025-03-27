# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, username, name, password=None):
        if not username:
            raise ValueError('The Username field must be set')
        if not name:
            raise ValueError('The Name field must be set')
        user = self.model(username=username, name=name)
        user.set_password(password)  # Hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, name, password=None):
        user = self.create_user(username, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, username):
        return self.get(username=username)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    calorie_norm = models.IntegerField(blank=True, null=True)
    diet_type = models.CharField(max_length=255, blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    food_preferences = models.TextField(blank=True, null=True)

    # Add fields required by PermissionsMixin and AbstractBaseUser
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name']

    class Meta:
        managed = False
        db_table = 'User'

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    calories = models.IntegerField()
    proteins = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()
    # photo = models.CharField(max_length=255)


    class Meta:
        managed = False
        db_table = 'ingredient'

    def __str__(self):
        return self.name


class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    calories = models.IntegerField(blank=True, null=True)
    proteins = models.FloatField(blank=True, null=True)
    fats = models.FloatField(blank=True, null=True)
    carbohydrates = models.FloatField(blank=True, null=True)
    photo = models.CharField(max_length=255)
    
    CATEGORY_CHOICES = [
        ('Сніданки', 'Сніданки'),
        ('Обіди', 'Обіди'),
        ('Вечері', 'Вечері'),
        ('Десерти', 'Десерти'),
        ('Салати', 'Салати'),
        ('Гарніри', 'Гарніри'),
        ('Закуски', 'Закуски'),
        ('Снеки', 'Снеки'),
        ('Пісні страви', 'Пісні страви'),
        ('Перші страви', 'Перші страви'),
        ('Другі страви', 'Другі страви'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    #ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')
    class Meta:
        managed = False
        db_table = 'recipe'

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    recipe = models.OneToOneField(Recipe, on_delete=models.CASCADE, primary_key=True)  # The composite primary key (recipe_id, ingredient_id) found, that is not supported. The first column is selected.
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField()

    def __str__(self):
        return f"{self.recipe.name} -> {self.ingredient.name}"

    class Meta:
        managed = False
        db_table = 'recipe_ingredient'
        unique_together = (('recipe', 'ingredient'),)



class ShoppingList(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.FloatField()
    in_stock = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'shopping_list'

    def __str__(self):
        return f"{self.user.name if self.user else 'Unknown'} – {self.ingredient.name}"


class UserMenu(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'user_menu'

    def __str__(self):
        return f"{self.user.name if self.user else 'Unknown'} – {self.ingredient.name} {self.quantity}"
