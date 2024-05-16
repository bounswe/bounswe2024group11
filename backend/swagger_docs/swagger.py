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
