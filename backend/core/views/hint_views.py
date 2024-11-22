# implement helper
def get_hint(id):
    try:
        hint = "text"
        return hint
    except:
        return None
    
array = ["kelime1", "kelime2", "kelime3"]
for i in array:
    print(get_hint(i))

# APIView