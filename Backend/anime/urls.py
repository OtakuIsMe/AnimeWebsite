from django.urls import path
from . import views

urlpatterns = [
    path('type/all', views.get_all_type.as_view(), name='get_all_type'),
    path('season/lately', views.get_3_years_season.as_view(), name='get_season_lately'),
    path('espisode/lately/<int:count>', views.get_animeEspisode_newest.as_view(), name='get_animeEspisode_newest'),
    path('newest/<int:count>', views.get_anime_newest.as_view(), name = 'get_anime_newest'),
    path('upcoming/<int:count>', views.get_anime_upcoming.as_view(), name = 'get_anime_upcoming'),
    path('name/<str:anime_name>',views.get_anime_by_name.as_view(), name= 'get_anime_by_name'),  
    path('espisode/add_video', views.add_anime_espisode_video.as_view(), name= 'add_anime_espisode_video'),
    path('search', views.search_anime.as_view(), name = 'search_name'),
    path("type", views.filter_anime_by_type.as_view(), name="filter_anime_by_type"),
    path("follow", views.follow_anime.as_view(), name="follow_anime"),
    path("follow/<int:userid>", views.get_anime_follow_by_user.as_view(), name="get_anime_follow_by_user"),
    path('video', views.get_anime_espisode_video.as_view(), name="get_anime_espisode_video"),
    path('history/add', views.add_history_anime_user.as_view(), name='add_history_anime_user')
]
