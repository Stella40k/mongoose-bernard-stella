import {tagModel} from "../model/tag.model.js";
import { articleModel } from "../model/article.model.js";

export const createTag = async(req, res)=>{
    try {
        const{name, description}= req.body;
        const newTag = await tagModel.create({
            name,
            description
        });
        res.status(201).json({
            ok: true,
            msg: "etiqueta creada",
            data: newTag
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al crear la etiqueta"
        })
    }
};
export const getTag = async(req, res)=>{
    try {
        const tag = await tagModel.findById(req.params.id);
        if(!tag){
            return res.status(404).json({
                ok: false,
                msg: "etiqueta no encontrada"
            });
        }
        res.status(200).json({
            ok: true,
            msg: tag
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "etiqueta no encontrada"
        })
    }
};
export const getTags = async(req, res)=>{
    try {
        const tags = await tagModel.find();
        res.status(200).json({
            ok: true,
            msg: tags
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al buscar las etiquetas"
        });
    }
};
export const updateTag = async(req, res)=>{
    try {
        const{name, description} = req.body;                 //pedir q expliquen mas de esta parte pq entiendo pero no
        const tag = await tagModel.findByIdAndUpdate(req.params.id, {name, description,}, {new: true});
        if(!tag){
            return res.status(404).json({
                ok: false,
                msg: "etiqueta no encontrada"
            });
        }
        res.status(200).json({
            ok: true,
            msg: "etiqueta actualizada",
            data: tag
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al actualizar la etiqueta"
        });
    }
};
export const deleteTag = async(req, res)=>{
    try {
        const tag = await tagModel.findByIdAndDelete(req.params.id);
        if(!tag){
            return res.status(404).json({
                ok: false,
                msg: "etiqueta no encontrada"
            });
        }

        //eliminamos las referencias cuando se elimina
        await articleModel.updateMany(
            {tags: tag._id},
            {$pull: {tags: tag._id}}
            //$pull es como decirle al mongo q saque los valores
            //o docs del arrays si existe, borramos o sacamos el objId del tag eliminado
        );
        res.status(200).json({
            ok: true,
            msg: "etiqueta eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al eliminar la etiqueta"
        });
    }
};