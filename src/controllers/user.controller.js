import {userModel} from '../model/user.model.js'
import { Profile } from '../model/profile.model.js';

export const createUser = async(req, res)=>{
    try {
        const {username, email, password} = req.body;
        const newUser = await userModel.create({
            username,
            email,
            password
        });
        //estructura "verbo + status + payload"
        res.status(201).json({
            //ok es un booleando q dice si la operacion salio bien o no
            ok: true,
            //mensage de respuesta 
            msg: "Usuario creado",
            //data es la info q se envia al front
            //es lo mismo a un res.json
            data: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error interno"
        });
    }
};
export const getUsers = async(req, res)=>{
    try {
        //no usare populate pq si necesito saber algo de user se hace su consulta propia
        //el populate lo usare en los hijos de user pq trae los datos relacionados
        const users = await userModel.find()
        res.status(200).json({
            ok: true,
            msg: users
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al buscar los usuarios"
        });
    }
};
export const getUser = async(req, res) =>{
    try {
        const user = await userModel.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "usuario no encontrado"
            });
        }
        res.status(200).json({
            ok: true,
            msg: user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "usuario no encontrado"
        });
    }
};
export const updateUser = async(req, res)=>{
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body,{new: true});
            if(!user){
                return res.status(404).json({
                    ok: false,
                    msg: "usuario no encontrado"
                });
            }
            res.status(200).json({
                ok: true,
                msg: "usuario actualizado"
            });
        } catch (error) {
            console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error al actualizar el usuario"
        })
    }
}
export const deleteUser = async(req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "usuario no encontrado"
            })
        }
        //eliminar el perfil asociado
        await Profile.findByIdAndDelete({user: user._id});

        res.status(200).json({
            ok: true,
            msg: "usuario eliminado"
        })
    } catch (error) {
        return res.statys(500).json({
            ok: false,
            msg: "error al eliminar el usuario"
        })
    }
};