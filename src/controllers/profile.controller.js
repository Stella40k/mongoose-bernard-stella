import {Profile} from "../model/profile.model.js"

export const createProfile = async(req, res)=>{
    try {
        const newProfile = await Profile.create(req.body);
        res.status(201).json({
            ok: true,
            msg: "perfil creado",
            data: newProfile
        });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "error al crear el perfil"
      })  
    }
};
export const getProfile = async(req, res)=>{
    try {
        const profile = await Profile.findById(req.params.id).populate(
            "user", "username email"
        );
        if(!profile){
            return res.status(404).json({
                ok: false, 
                msg: "perfil no encontrado"
            });
        }
        res.status(200).json({
            ok: true,
            msg: profile
        });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "error al buscar el perfil"
      })  
    }
};
export const getProfiles = async(req, res)=>{
    try {                                     //el populate reemplaza el idO por el doc completo o a mitad del q se hace ref
        const profiles = await Profile.find().populate(
            //user es la referencia q hay en profile, cada profile guara un objectId
            //q debe tener ese documentoo en la coleccion user
            //username email es la info q quiero traer del documento relacionado(user)
            "user", "username email"
        );
        if (profiles.length === 0) {
            return res.status(200).json({
                ok: true,
                msg: "en espera de que se agreguen los perfiles"
            });
        }
        res.status(200).json({
            ok: true,
            msg: profiles
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al buscar los profiles"
        })
    }
};
export const updateProfile = async(req, res)=>{
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        ).populate("user", "username email");
        if(!profile){
            return res.status(404).json({
                ok: false,
                msg: "perfil no encontrado"
            });
        }
        res.status(200).json({
            ok:true,
            msg: "perfil actualizado",
            data: profile
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "error al actualizar el perfil"
        })
    }
};
export const deleteProfile = async(req, res)=>{
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if(!profile){
            return res.status(404).json({
                ok: false,
                msg: "perfil no encontrado"
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "perfil eliminado correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: "error al eliminar el perfil"
        });
    }
};