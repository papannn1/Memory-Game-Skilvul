import json
from django.views import View
from django.http import JsonResponse
from django.utils.html import strip_tags

from api.models import TimeRecord

class HighScoreView(View):
    def get(self, request, *args, **kwargs):
        qs = TimeRecord.objects.order_by('finish_time')[:10]
        high_scores = []
        for item in qs:
            score = {
                "nickname": strip_tags(item.nickname),
                "time": item.finish_time
            }
            high_scores.append(score)
        response = high_scores
        return JsonResponse(response, safe=False)

    def post(self, request, *args, **kwargs):
        response = {"msg": "High score saved"}
        try:
            data = json.loads(request.body)
            TimeRecord.objects.create(
                nickname=strip_tags(data['nickname']),
                finish_time=data['finish_time']
            )
            except Exception as e:
            response = {"msg": "High score not saved, please check your request"}
        return JsonResponse(response, safe=False)
