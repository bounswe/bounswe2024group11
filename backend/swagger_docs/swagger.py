from drf_yasg import openapi

wikidata_suggestions_swagger = {
    "manual_parameters": [
        openapi.Parameter(
            name="keyword",
            in_=openapi.IN_QUERY,
            description="The keyword to search in Wikidata.",
            type=openapi.TYPE_STRING,
            required=True,
        )
    ],
    "responses": {
        200: openapi.Response(
            description="A list of Wikidata suggestions.",
            schema=openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "qid": openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="The QID of the Wikidata entity.",
                        ),
                        "label": openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="The label of the Wikidata entity.",
                        ),
                        "description": openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="The description of the Wikidata entity.",
                        ),
                    },
                ),
            ),
        ),
        400: 'Keyword parameter "keyword" is required.',
        500: "An unexpected error occurred while processing the request.",
    },
}


search_post_swagger = {
    "manual_parameters": [
        openapi.Parameter(
            name="qid",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="The QID to search in Wikidata.",
            required=True,
        ),
        openapi.Parameter(
            name="category",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description='The category to search in Wikidata (e.g., "born in", "enemy of", "occupation").',
            required=True,
        ),
    ],
    "responses": {
        200: openapi.Response(
            description="List of posts matching the search criteria.",
            schema=openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                        "username": openapi.Schema(type=openapi.TYPE_STRING),
                        "title": openapi.Schema(type=openapi.TYPE_STRING),
                        "content": openapi.Schema(type=openapi.TYPE_STRING),
                        "image_src": openapi.Schema(
                            type=openapi.TYPE_STRING, nullable=True
                        ),
                        "qid": openapi.Schema(type=openapi.TYPE_STRING),
                        "qtitle": openapi.Schema(type=openapi.TYPE_STRING),
                        "created_at": openapi.Schema(
                            type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME
                        ),
                        "updated_at": openapi.Schema(
                            type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME
                        ),
                    },
                ),
            ),
        ),
        400: 'Both "qid" and "category" parameters are required.',
        500: "An unexpected error occurred while processing the request.",
    },
}

login_swagger = {
    "request_body": openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=["username", "password"],
        properties={
            "username": openapi.Schema(
                type=openapi.TYPE_STRING, description="The username of the user."
            ),
            "password": openapi.Schema(
                type=openapi.TYPE_STRING, description="The password of the user."
            ),
        },
    ),
    "responses": {
        200: openapi.Response(
            description="Login successful. Returns the user details and tokens.",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "refresh": openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description="The refresh token for the user.",
                    ),
                    "token": openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description="The access token for the user.",
                    ),
                    "user": openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                            "username": openapi.Schema(type=openapi.TYPE_STRING),
                            "email": openapi.Schema(type=openapi.TYPE_STRING),
                            "first_name": openapi.Schema(type=openapi.TYPE_STRING),
                            "last_name": openapi.Schema(type=openapi.TYPE_STRING),
                        },
                    ),
                },
            ),
        ),
        400: "Please provide both username and password.",
        401: "Invalid credentials.",
    },
}

wiki_info_swagger = {
        "manual_parameters":[
            openapi.Parameter(
                "qid",
                openapi.IN_QUERY,
                description="The QID (Query ID) of the Wikidata entity. "
                            "QID is a unique identifier assigned to each item on Wikidata. "
                            "It should start with 'Q'.",
                type=openapi.TYPE_STRING,
                required=True,
            ),
        ],
        "responses":{
            200: openapi.Response(
                description="Successful retrieval of Wikidata information.",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "keyword": openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="The QID used for the query.",
                        ),
                        "results": openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            description="Array of Wikidata entity information.",
                            items=openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                properties={
                                    "Inception": openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description="The inception date of the Wikidata entity.",
                                    ),
                                    "Gender": openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description="The gender of the Wikidata entity.",
                                    ),
                                    "Birth Name": openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description="The birth name of the Wikidata entity.",
                                    ),
                                    "Place of Birth": openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description="The place of birth of the Wikidata entity.",
                                    ),
                                    "Image": openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description="The URL of the image associated with the Wikidata entity.",
                                    ),
                                    "Description": openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description="A brief description of the Wikidata entity.",
                                    ),
                                    "Label": openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description="The label or name of the Wikidata entity.",
                                    ),
                                }
                            )
                        )
                    }
                )
            ),
            400: "Bad Request: Missing or invalid QID parameter.",
            500: "Internal Server Error: An unexpected error occurred."
        },
}
