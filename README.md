1. Crear colecciones
● Deben crear mínimo 3 colecciones a elección.
● Cada proyecto debe cumplir:
○ 1 propiedad embebida en alguna colección.
○ 1 relación 1:1.
○ 1 relación 1:N.
○ 1 relación N:M.
● Justificar en un documento o en el README.md por qué eligieron embebido o
referenciado en cada caso.
2. Crud Básico
Implementar creación, lectura, actualización y eliminación en todas las colecciones
creadas.
● Uso de try/catch en todos los controladores.
● La eliminación debe contemplar lógica y en cascada.
3. Investigar
Se debe investigar, aplicar y justificar:
● Como se utiliza el populate desde las colecciones que no tienen referencias.
● Como se realizan las eliminaciones lógicas y en cascada.
● Cómo crear un endpoint que permita agregar un nuevo vínculo en una relación
muchos a muchos.
Bonus: Implementación de validaciones básicas o utilizando express-validator.

NOTAS

* embedido: uno dentro de otro o referenciado por otro :P
* schema: define las estructuras de los documentos en una coleccion de mongo, especificando sus campos y sus tipos de datos , validaciones y asi para garantizar la integridad y consistencia de los datos
* ObjectID es una clase y ObjectIds son objetos, 

RELACIONES
1->1
user->perfil

1->M
user->article

M->M
article->tag

PREGUNTAR
* esto no entendi bien "Cuando conviertes un ObjectId en una cadena usando toString(), obtienes una cadena hexadecimal de 24 caracteres" esta en la docu 