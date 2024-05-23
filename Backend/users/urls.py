from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.get_all_users.as_view(), name='get_all_users'),
    path('<int:user_id>/', views.get_user_by_id.as_view(), name = 'get_user_by_id'),
    path('login', views.check_login.as_view(), name = 'check_login'),
    path('token', views.get_user_by_token.as_view(), name = 'get_user_by_token'),
    path('update', views.update_user.as_view(), name='update_user')
]
