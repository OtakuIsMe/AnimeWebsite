from django.urls import path
from . import views

urlpatterns = [
    path('comment/', views.get_5_comments_each.as_view(), name='get_5_comments_each'),
    path('rating/statistic/<int:anime_id>', views.statistic_anime_rating.as_view(), name= 'statistic_anime_rating'),
    path('rating/anime', views.rating_anime.as_view(), name='rating_anime'),
    path('rating', views.get_rating_user_anime.as_view(), name='get_rating_user_anime')
]
