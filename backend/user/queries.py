birthOfPlace_query = """
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
        wd:Q79037 wdt:P7047 ?enemy.

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
memberOf = """
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