---
name: ModelViewset and Model
about: Create an issue for implementing ModelViewset and Model for Django REST
---

## Title: Implement <YOUR MODEL> Model and a ModelViewSet for it in Django REST Framework

---

#### To be reviewed by: @username

---

## Description
We need to create <YOUR MODEL> and `ModelViewSet` for it to efficiently handle CRUD operations using Django REST Framework. A `ModelViewSet` provides default implementations for actions such as `list`, `retrieve`, `create`, `update`, and `delete`, reducing boilerplate code and improving API consistency.

---

## Tasks

1. **Create Model**
   - Define a model in `models.py`
   - Define the necessary fields with appropriate properties.
1. **Create Serializer:**
   - Define a serializer for `[YourModelName]` in `serializers.py`.
   - Include appropriate fields and validation logic as needed.

2. **Create ViewSet:**
   - Define a `ModelViewSet` for `[YourModelName]` in `views.py`.
   - Use the serializer created in the first step.
   - Set up querysets and filters if needed.

3. **Update URLs:**
   - Register the `ModelViewSet` with a router in `urls.py`.
   - Use DRF's `DefaultRouter` or any custom router.

4. **Testing:**
   - Test all endpoints (`list`, `retrieve`, `create`, `update`, and `delete`) using tools like Postman, cURL, or Django's test client.
   - Write unit tests for each endpoint to ensure API reliability.

---

## Acceptance Criteria

1. A working API with the following endpoints:
   - `GET /api/v1/[view-path]/` - List all objects
   - `GET /api/v1/[view-path]/<id>/` - Retrieve an object by ID
   - `POST /api/v1/[view-path]/` - Create a new object
   - `PUT /api/v1/[view-path]/<id>/` - Update an object
   - `DELETE /api/v1/[view-path]/<id>/` - Delete an object

2. Proper validations and error handling implemented.
3. Swagger API documentation updated.
4. Comprehensive unit tests with at least 80% test coverage.

---

## References

- [Django REST Framework Documentation: ModelViewSet](https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset)
- [Django REST Framework Routers](https://www.django-rest-framework.org/api-guide/routers/)