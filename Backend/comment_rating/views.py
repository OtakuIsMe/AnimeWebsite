from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Comments, Rating
from .serializers import CommentsSerializers, RatingSerializers
from users.serializers import UsersSerializer
from anime.models import Anime
from users.models import Users
from django.utils import timezone
from images import views as ImgView
# Create your views here.

class get_5_comments_each(APIView):
    def get(self, request):
        try:
            count = int(request.query_params.get('count'))
            anime_id= int(request.query_params.get('anime_id'))
            start_index = (count - 1) * 5
            end_index = count * 5
            anime = Anime.objects.get(id = anime_id)
            comments = Comments.objects.filter(animeid = anime).order_by('-dateup')[start_index:end_index]
            commentsData = []
            for comment in comments:
                comment_data = CommentsSerializers(comment).data
                comment_data['user'] = UsersSerializer(comment.userid).data
                comment_data['user']['img']= ImgView.get_user_img(comment.userid.id)
                comment_data['rating'] = RatingSerializers(comment.ratingid).data
                commentsData.append(comment_data)
            return Response(commentsData)
        except Exception as e:
            print(f'Error getting comments: {e}')
            return Response({'message' : 'Error getting comments'})

       
class statistic_anime_rating(APIView):
    def get(self, request, anime_id):
        try:
            anime = Anime.objects.get(id = anime_id)
            ratingAll = Rating.objects.filter(animeid = anime).count()
            rating5 = Rating.objects.filter(animeid = anime, rating = 5).count()
            rating4 = Rating.objects.filter(animeid = anime, rating = 4).count()
            rating3 = Rating.objects.filter(animeid = anime, rating = 3).count()
            rating2 = Rating.objects.filter(animeid = anime, rating = 2).count()
            rating1 = Rating.objects.filter(animeid = anime, rating = 1).count()
            ratingAVG = (rating5*5 + rating4*4 + rating3*3 + rating2*2 + rating1*1)/ratingAll 
            return Response({'All': ratingAll,
                             'Stars5': rating5,
                             'Stars4': rating4,
                             'Stars3': rating3,
                             'Stars2': rating2,
                             'Star1': rating1,
                             'AVG': ratingAVG})
        except Exception as e:
            print(f'Error getting rating statistic: {e}')
            return Response({'message' : 'Error getting rating statistic'})
class rating_anime(APIView):
    def post(self, request):
        try:
            anime_id = request.data['anime_id']
            user_id = request.data['user_id']
            ratingC = request.data['rating']
            try:
                rating = Rating.objects.get(animeid = Anime.objects.get(pk = anime_id), userid = Users.objects.get(pk = user_id))
                rating.rating = ratingC
                rating.daterate = timezone.now()
                rating.save()
            except Exception as e:
                Rating.objects.create(animeid = Anime.objects.get(pk = anime_id), userid = Users.objects.get(pk = user_id), rating = ratingC, daterate = timezone.now())
                
            return Response({'message': 'Rating successful'})
        except Exception as e:
            print(f'Error rating anime: {e}')
            return Response({'message' : 'Error rating anime'})
class get_rating_user_anime(APIView):
    def get(self, request):
        try:
            anime_id = int(request.query_params.get('anime_id'))
            user_id = int(request.query_params.get('user_id'))
            print 
            try:
                rating = Rating.objects.get(animeid = Anime.objects.get(pk = anime_id), userid = Users.objects.get(pk = user_id))
                return Response ({'rating': rating.rating})
            except Exception as e:
                return Response ({'rating': 0})
            
        except Exception as e:
            print(f'Error get rating anime: {e}')
            return Response({'message' : 'Error get rating anime'})
