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
* Populate: funcion propia de mongoose q reemplaza los objectIds por documentos de la coleccion refenciada. Mongoose verifica q algun doc esta ref con algo, cuando usamos .populate("algo") hace otra consulta automatica a la coleccion referenciada, ahi reemplaza los objectIds por los docs completos de la referencia


RELACIONES
1->1
user->perfil
si elimino user, se elimina el perfil
si elimino el perfil el user permanece

1->M
user->article

M->M
article->tag
* si borro user -> borro profile y sus articles
* si borro profile -> solo se borra eso, user sigue intacto
* si borro tal -> elimino sus documentos de los articles donde hacia ref
* si elimino tag -> solo borro article

PREGUNTAR
* esto no entendi bien "Cuando conviertes un ObjectId en una cadena usando toString(), obtienes una cadena hexadecimal de 24 caracteres" esta en la docu 

3. 
● Como se utiliza el populate desde las colecciones que no tienen referencias.
- populate funciona si hay un esqueme referenciado por ref a otra coleccion, por ejemplo profile esta haciendo referencias a user pero user no a profile. Sin las referencias no podes hacer populate, usa para referencias ObjectId.
Si quisieramos traer el perfil del user sin tener este campo relacionado podemos usar esta form: virtual populate:
(ejemplo usando task para evitar confundirme)
userSchema.virtual("tasks", {
  ref: "Task",          // modelo referenciado
  localField: "_id",    // campo local (User._id)
  foreignField: "author" // campo en Task que apunta al User
});
poniendo esto en el controlador
const user = await userModel.findById(id).populate("tasks");

esto se hace mas para consultas sin populate o consultas desde el lado q no tiene la ref.

● Como se realizan las eliminaciones lógicas y en cascada.
- en moongose hay dos formas para eliminar de forma logica:
eliminacion fisica(hard delete):
el documento se borra de la base de datos con "findByIdAndDelete()", ej:
await userModel.findByIdAndDelete(id);
el problema es que perdemos toda la data

eliminacion logica(soft delete):
aca amrcamos el documento como eliminado en lugar de borrarlo totalmente de la bd, se hace agregando campos como "isDelete" o "status" en el esquema. lo bueno de esto es que mantenemos los datos como historial, por mas de que este eliminado seguira en la base de datos pero no se mostrara al hacer solicitudes.

eliminacion en cascada: 
si elimino el padre de un documento , tambien elimino los hijos . Ej: si elimino user se borrara el perfil y el articulo(si es que hice esa parte del codigo, sino solo se borra la parte del perfil). 
se ve asi:
userSchema.pre("findOneAndDelete", async function(next) {
  const userId = this.getQuery()._id;
  await Profile.deleteOne({ user: userId }); // 1:1
  await Article.deleteMany({ author: userId }); // 1:M
  next();
});
cuando se ejecute "User.findByIdAndDelete(id)", mongoose lo eliminara automaticamente en casscada.

● Cómo crear un endpoint que permita agregar un nuevo vínculo en una relación
muchos a muchos.
Bonus: Implementación de validaciones 
- Yo agregue un endpoint para agregar mas etiquetas a un articulo, esto se hace en las relaciones mucho a mucho, seria como la tabla intermedia de sequelize o asi lo entendi yo.
esto se entiende gracias a esta parte del modelo:
tags: [{
  type: Schema.Types.ObjectId,
  ref: "Tag"
}]
y haciendo un nuevo post en el controlador de esta forma:
// PATCH /articles/:id/tags
export const addTagToArticle = async (req, res) => {
  try {
    const { tagId } = req.body;
    const article = await articleModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { tags: tagId } }, // evita duplicados
      { new: true }
    ).populate("tags", "name description");

    if (!article) {
      return res.status(404).json({
        ok: false,
        msg: "Artículo no encontrado"
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Etiqueta agregada",
      data: article
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al vincular etiqueta"
    });
  }
};
$addToSet evita que se dupliquen las etiquetas creando un vinculo en la relacion N:M
tambien se pueden usar $push para agregar ObjectId a un array de referencias.