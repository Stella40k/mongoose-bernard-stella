import { articleModel } from "../model/article.model.js"
import { userModel } from "../model/user.model.js"
import { tagModel } from "../model/tag.model.js"

export const createArticle = async (req, res)=>{
    try {
        const{title, content, status, author, tags} = req.body;
        const user = await userModel.findById(author);
        //esta parte es para verivifar q exista un autor|
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "autor no encontrado"
            });
        }
        const newArticle = await articleModel.create({
            title,
            content,
            status,
            author,
            tags
        });
        res.status(201).json({
            ok: true,
            msg: "articulo creado correctamente",
            data: newArticle
        });
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: "error al crear el articulo"
        })
    }
};
export const getArticles = async(req, res) =>{
    try {
        const articles = await articleModel.find().populate(
            "author", "username email").populate(
            "tags", "name description");
        if (articles.length === 0) {
            return res.status(200).json({
                ok: true,
                msg: "en espera de que se agreguen los articulos"
            });
        }
        res.status(200).json({
            ok:true,
            data: articles
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error al obtener los articulos"
        });
    }
};
export const getArticle = async(req, res) =>{
    try {
        const article = await articleModel.findById(req.params.id).populate(
            "author", "username email").populate(
            "tags", "name description");
        if(!article){
            return res.status(404).json({
                ok: false,
                msg: "articulo no encontrado"
            });
        }
        res.status(200).json({
            ok: true,
            data: article
        });
    } catch (error) {
        res.status(500).json({
            ok: false, 
            msg: "error al buscar el articulo"
        })
    }
};
export const updateArticle = async(req, res) =>{
    try {//buscar diferencia: findById, findByIdAndDelete
        const article = await articleModel.findByIdAndDelete(req.params.id);
        if(!article){
            return res.status(404).json({
                ok: false,
                msg: "articulo no encontrado"
            });
        }
        res.status(200).json({
            ok:true,
            msg: "articulo actualizado",
            data:article
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al actualizar el articulo"
        });
    }
};
export const deleteArticle = async(req, res) =>{
    try {
        const article = await articleModel.findByIdAndDelete(req.params.id, 
            {isDeleted: true},
            {new: true},
        );
        if(!article){
            return res.statis(404).json({
                ok: false,
                msg: "articulo no encontrado"
            });
        }
        res.status(200).json({
            ok: true,
            msg: "srticulo eliminado"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al eliminar el articulo"
        });
    }
};
export const addTagArticle = async(req, res) =>{
    try {
        const{ articleId, tagId }= req.body;
        const article = await articleModel .findById(articleId);
        if(!article)
            return res.status(404).json({
                ok: false,
                msg: "articulo no encontrado"
        });
        const tag = await tagModel.findById(tagId);
        if(!tag)
            return res.status(404).json({
                ok: false,
                msg: "etiqueta no encontrada"
        });
        if(article.tags.includes(tagId)){
            return res.status(400).json({
                ok: false,
                msg: "el articulo ya tiene ese tag"
            });
        }
        article.tags.push(tagId);
        await article.save();
        res.status(200).json({
            ok: true,
            msg:"etiqueta aagregada al articulo",
            data: article
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al agregar la etiqueta"
        });
    }
}