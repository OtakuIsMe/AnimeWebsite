from django.urls import path
from . import views

urlpatterns = [
    path('anime/add', views.AddImagesAnime.as_view(), name='add_images_anime'),
    path('espisode/all/add', views.AddImagesEspisodeForAll.as_view(), name='AddImagesEspisodeForAll')
]
