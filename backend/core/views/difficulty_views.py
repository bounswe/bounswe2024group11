from rest_framework.views import APIView
from rest_framework import permissions, status, serializers
from rest_framework.response import Response
from ..permissions import IsAuthorOrReadOnly
from datamuse import Datamuse

def get_difficulty(keyword):
    # get the word information
    api = Datamuse()
    res = api.words(sp= keyword, md='psf', max=1)
    syc = len(api.words(rel_syn=keyword)) # synonym count
    slc = res[0]['numSyllables'] # syllable count
    pos = res[0]['tags'][0] # part of speech
    freq = float(res[0]['tags'][-1][2:]) # frequency
    # point for syllable count
    if(slc == 1): syl_point = 2
    elif(slc == 2): syl_point = 3
    elif(slc == 3): syl_point = 5
    elif(slc > 3): syl_point = 10  
    else: syl_point = 3
    # point for part of speech
    if(pos == 'n' or pos == 'v'): pos_point = 3
    elif(pos == 'u'): pos_point = 5
    elif(pos == 'adj' or pos == 'adv'): pos_point = 10
    else: pos_point = 5
    # point for frequency
    if(freq < 10): freq_point = 10
    elif(freq > 25): freq_point = 3
    else: freq_point = 6
    # point for synonym count
    if(syc < 5): syn_point = 4
    elif(syc > 5 and syc < 10): syn_point = 10
    elif(syc > 10 and syc < 15): syn_point = 8
    elif(syc > 15): syn_point = 6
    else: syn_point = 5
    # total point
    total_point = (0.55*freq_point) + (0.15*syn_point) + (0.15*pos_point) + (0.15*syl_point)
    if(total_point <= 3.33): total_point = 10
    elif(total_point > 6.66): total_point = 30
    else: total_point = 20
    del api
    return total_point

class QuestionPointView(APIView):
    def get(self, request):
        try:
            keyword = request.GET.get('keyword')
            # check if keyword is sent
            if not keyword:
                return Response({'Error Parameter "keyword" is required.'}, status=status.HTTP_400_BAD_REQUEST)
            point = get_difficulty(keyword)
            return Response({'question_point': point}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



