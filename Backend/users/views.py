from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Users, Role
from .serializers import UsersSerializer, RoleSerializer
from images import views as ImgView
from images.models import Images
from images.serializers import ImagesSerializer
import jwt
import base64

# Create your views here.

class get_all_users(APIView):
    def get(self, request):
        users = Users.objects.all()
        serializer = UsersSerializer(users, many = True)
        return Response(serializer.data)
    
class get_user_by_id(APIView):
    def get(self, request, user_id):
        return Response (getUserById(user_id))
def getUserById(user_id):
    user = Users.objects.get(pk = user_id)
    return UsersSerializer(user).data
class check_login(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        try:
            user = Users.objects.get(email=email, password=password)
            data = UsersSerializer(user).data
            data['img'] = ImgView.get_user_img(user.id)
            encode = jwt.encode(data, 'I am atomic')
            return Response({
                'status': True,
                'token': encode
            })
        except Exception as e:
            return Response({
                'status': False
            })
class get_user_by_token(APIView):
    def post(self, request):
        token = request.data['token']
        decode = jwt.decode(token, 'I am atomic', algorithms=['HS256'])
        return Response(decode)
    
class update_user(APIView):
    def post(self, request):
        try:
            user_id = request.data['userid']
            dob = request.data['dob']
            gender = request.data['gender']
            username = request.data['username']
            user = Users.objects.get(pk = user_id)
            user.dob = dob
            user.gender = gender
            user.username = username
            user.save()
            try:
                image_file = request.FILES['img']
                with image_file.open('rb') as f:
                        img_binary_data = f.read()
                img_base64 = base64.b64encode(
                    img_binary_data).decode('utf-8')

                image = Images.objects.get(userid = user)
                print(image.id)
                image.url = img_base64
                image.save()
            except Exception as e:
                print(f"Error update user:{e}")
            return Response({"message":"Added successful"})
        except Exception as e:
            print(f"Error update user:{e}")
            return Response({"message": "Error update user"})

