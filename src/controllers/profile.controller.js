import {Profile} from "../model/profile.model.js"
import { Types } from "mongoose";
import mongoose from "mongoose"

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
        
    } catch (error) {
        
    }
};
export const getProfiles = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};
export const updateProfile = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};
export const deleteTagprofile = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};