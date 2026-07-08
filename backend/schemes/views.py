from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Scheme
from .serializers import SchemeSerializer


@api_view(["GET"])
def get_schemes(request):
    """GET /api/schemes/ -> list of all schemes."""
    schemes = Scheme.objects.all()
    serializer = SchemeSerializer(schemes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_scheme_detail(request, scheme_id):
    """GET /api/schemes/<scheme_id>/ -> single scheme, looked up by scheme_id (e.g. AGR001)."""
    scheme = get_object_or_404(Scheme, scheme_id=scheme_id)
    serializer = SchemeSerializer(scheme)
    return Response(serializer.data)
