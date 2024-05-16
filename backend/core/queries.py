born_in = """
#New York doğumlu insanlar
#title: Humans born in New York City
SELECT DISTINCT ?item ?itemLabel ?itemDescription ?sitelinks ?placeOfBirthLabel 
WHERE {
    ?item wdt:P31 wd:Q1114461;            # Any instance of a human
            wdt:P19/wdt:P131* wd:%s;
            
            wikibase:sitelinks ?sitelinks.
            OPTIONAL{
            ?item wdt:P19 ?placeOfBirth.
            ?placeOfBirth rdfs:label ?placeOfBirthLabel.
            FILTER(LANG(?placeOfBirthLabel) ="en").
            }
            
            # Who was born in any value (eg. a hospital)
# that has the property of 'administrative area of' New York City or New York City itself.

# Note that using wdt:P19 wd:Q60;  # Who was born in New York City.
# Doesn't include humans with the birth place listed as a hospital
# or an administrative area or other location of New York City.

        
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
ORDER BY DESC(?sitelinks)
"""

enemy_of_query = """
SELECT DISTINCT ?enemy ?enemyLabel (SUM(?sitelink) AS ?sitelinks)
        WHERE {
        # Replace "INPUT_ENTITY_QID" with the QID of the input entity
        wd:%s wdt:P7047 ?enemy.

        ?enemy wikibase:sitelinks ?sitelink.
        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        GROUP BY ?enemy ?enemyLabel
        ORDER BY DESC(?sitelinks)
"""
#occupation query gets an input occupation and output the characters with this occupation.
occupation = """
SELECT DISTINCT ?item ?itemLabel (SUM(?sitelink) AS ?sitelinks)
        WHERE {
        
        ?item wdt:P31 wd:Q1114461;
                    wdt:P106 wd:%s;
                    rdfs:label ?itemLabel.

        ?item wikibase:sitelinks ?sitelink.
        FILTER(LANG(?itemLabel) ="en").
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        
        }
        GROUP BY ?item ?itemLabel
        ORDER BY DESC(?sitelinks)
"""

present_in_work = """
SELECT DISTINCT ?item ?itemLabel (SUM(?sitelink) AS ?sitelinks)
        WHERE {
        
        ?item wdt:P31 wd:Q1114461;
                    wdt:P1441 wd:%s.

        ?item wikibase:sitelinks ?sitelink.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        GROUP BY ?item ?itemLabel
        ORDER BY DESC(?sitelinks)
"""

educated_at = """
SELECT DISTINCT ?item ?itemLabel (SUM(?sitelink) AS ?sitelinks)
        WHERE {
        
        ?item wdt:P31 wd:Q1114461;
                    wdt:P69 wd:%s.

        ?item wikibase:sitelinks ?sitelink.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        GROUP BY ?item ?itemLabel
        ORDER BY DESC(?sitelinks)
"""
member_of = """
SELECT DISTINCT ?item ?itemLabel(SUM(?sitelink) AS ?sitelinks)
        WHERE {
        
        ?item wdt:P31 wd:Q1114461;
                    wdt:P463 wd:%s.

        ?item wikibase:sitelinks ?sitelink.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        GROUP BY ?item ?itemLabel
        ORDER BY DESC(?sitelinks)
"""

wiki_info = """
SELECT ?inception ?sexOrGenderLabel ?birthName ?placeOfBirthLabel ?image ?description ?label
WHERE {
  BIND(wd:%s AS ?character).
  OPTIONAL { ?character wdt:P571 ?inception. }      # inception
  OPTIONAL { ?character wdt:P21 ?sexOrGender. }     # sex or gender
  OPTIONAL { ?character wdt:P1477 ?birthName. }     # birth name
  OPTIONAL { ?character wdt:P19 ?placeOfBirth. }    # place of birth
  OPTIONAL { ?character wdt:P18 ?image. }
  
  OPTIONAL { ?character schema:description ?description. FILTER(LANG(?description) = "en") }  # description
  OPTIONAL { ?character rdfs:label ?label. FILTER(LANG(?label) = "en") }                        # label
  
  OPTIONAL { ?sexOrGender rdfs:label ?sexOrGenderLabel. FILTER(LANG(?sexOrGenderLabel) = "en") }
  OPTIONAL { ?placeOfBirth rdfs:label ?placeOfBirthLabel. FILTER(LANG(?placeOfBirthLabel) = "en") }
  
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}

"""