import requests

BASE_URL = "https://babelnet.io/v6"
API_KEY = ""  # Replace with your BabelNet API key

def get_hint(word ,language="EN", targetLang="EN"):
    """Fetch a hint (synonym or example) from BabelNet for a given word."""

    # Step 1: Get synset IDs for the word
    synset_id_url = f"{BASE_URL}/getSynsetIds"
    params = {
        "lemma": word,
        "searchLang": language,
        "key": API_KEY
    }

    
        # Fetch synset IDs
    response = requests.get(synset_id_url, params=params)
    response.raise_for_status()
    synset_ids = response.json()

    if not synset_ids:
        print("No synset IDs found for the word.")
        return None

    # Add additional logic for user to choose the synset
    synset_id = synset_ids[0]['id']
    # print(f"Synset ID for '{word}': {synset_id}")

    synset_url = f"{BASE_URL}/getSynset"
    params = {
        "id": synset_id,
        "key": API_KEY,
        "targetLang": targetLang,
        
    }
    responseSynset= requests.get(synset_url, params=params)
    responseSynset.raise_for_status()
    synset= responseSynset.json()
    # print(synset)

    #     try:
    #         response = requests.get(url, params=params)
    #         response.raise_for_status()  # Raises an error for bad responses
    #         data = response.json()

    #         # Process data based on hint type
    #         if hint_type == "synonym":
    #             return BabelNetService.extract_synonyms(data)
    #         elif hint_type == "example":
    #             return BabelNetService.extract_example(data)
    #         else:
    #             return None

    #     except requests.RequestException as e:
    #         print(f"Error fetching hint from BabelNet: {e}")
    #         return None

    # @staticmethod
    # def extract_synonyms(data):
    #     """Extracts synonyms from BabelNet data."""
    #     synonyms = [sense['properties']['fullLemma'] for sense in data['senses']]
    #     return synonyms[:3] if synonyms else None

    # @staticmethod
    # def extract_example(data):
    #     """Extracts example sentences from BabelNet data."""
    #     examples = data.get("examples", [])
    #     return examples[0] if examples else None
