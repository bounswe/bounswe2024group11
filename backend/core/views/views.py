from django.urls import reverse

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse(f"Please refer to the docs at: {reverse('schema-swagger-ui')}")

