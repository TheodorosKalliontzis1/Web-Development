var BabylonJsBoneMapper = {
};

(function() {
    'use strict';
    
    self['BabylonJsBoneMapper'] = BabylonJsBoneMapper;

    const VROID_FAMILY_NAME = 'vroid';
    const WEBAVERSE_FAMILY_NAME = 'webaverse';
    const MIXAMORIG_FAMILY_NAME = 'mixamorig';

    BabylonJsBoneMapper['VROID_FAMILY_NAME'] = VROID_FAMILY_NAME;
    BabylonJsBoneMapper['WEBAVERSE_FAMILY_NAME'] = WEBAVERSE_FAMILY_NAME;
    BabylonJsBoneMapper['MIXAMORIG_FAMILY_NAME'] = MIXAMORIG_FAMILY_NAME;
    
    var babylonJsBoneMappingInfoJsonObject = null;
    
    var MIXAMO_BONE_NAME_PREFIX = 'mixamorig:';
    
    function fetchAsJson(url) {
        return new Promise(function(resolve, reject) {
            fetch(url).then(function(response) {
                if (response.ok === false) {
                    reject('Error when fetch: ' + url);
                    
                    return;
                }
                
                
                return response.json();
            }).then(function(json) {
                resolve(json);
            }).catch(function(errorMessage) {
                reject(errorMessage);
            });
        });
    };
    

    (function() {
        var url = (function() {
            if (typeof(document) === 'undefined') {
                return 'https://cdn-latest.visual-paradigm.com/diagrams/js/babylonjs/babylonjs-bone-mapping-info.json';
            }
            
            
            
            var currentScriptUrl = document.currentScript.src;
            var lastIndexOfForwardSlash = currentScriptUrl.lastIndexOf('/');
            
            return currentScriptUrl.substring(0, lastIndexOfForwardSlash + 1) + 'babylonjs-bone-mapping-info.json';
        })();
        
        fetchAsJson(url).then(function(babylonJsBoneMappingInfoJsonObjectParameter) {
            babylonJsBoneMappingInfoJsonObject = babylonJsBoneMappingInfoJsonObjectParameter;
        }).catch(function(errorMessage) {
            console.error(errorMessage);
        });
    })();
    
    var createBoneNamesMapping = function(){
        var result={
        }

        var createMappingForVroid=function(){
            var mapping = new Map(); 

            mapping.set("mixamorig:Hips","J_Bip_C_Hips");
            mapping.set("mixamorig:LeftUpLeg","J_Bip_L_UpperLeg");
            mapping.set("mixamorig:LeftLeg","J_Bip_L_LowerLeg");
            mapping.set("mixamorig:LeftFoot","J_Bip_L_Foot");
            mapping.set("mixamorig:LeftToeBase","J_Bip_L_ToeBase");
            mapping.set("mixamorig:LeftToe_End","");
            mapping.set("mixamorig:LeftToe_End_end","");
            mapping.set("mixamorig:RightUpLeg","J_Bip_R_UpperLeg");
            mapping.set("mixamorig:RightLeg","J_Bip_R_LowerLeg");
            mapping.set("mixamorig:RightFoot","J_Bip_R_Foot");
            mapping.set("mixamorig:RightToeBase","J_Bip_R_ToeBase");
            mapping.set("mixamorig:RightToe_End","");
            mapping.set("mixamorig:RightToe_End_end","");
            mapping.set("mixamorig:Spine","J_Bip_C_Spine");
            mapping.set("mixamorig:Spine1","");
            mapping.set("mixamorig:Spine2","");
            mapping.set("mixamorig:LeftShoulder","J_Bip_L_Shoulder");
            mapping.set("mixamorig:LeftArm","J_Bip_L_UpperArm");
            mapping.set("mixamorig:LeftForeArm","J_Bip_L_LowerArm");
            mapping.set("mixamorig:LeftHand","J_Bip_L_Hand");
            mapping.set("mixamorig:LeftHandIndex1","J_Bip_L_Index1");
            mapping.set("mixamorig:LeftHandIndex2","J_Bip_L_Index2");
            mapping.set("mixamorig:LeftHandIndex3","J_Bip_L_Index3");
            mapping.set("mixamorig:LeftHandMiddle1","J_Bip_L_Middle1");
            mapping.set("mixamorig:LeftHandMiddle2","J_Bip_L_Middle2");
            mapping.set("mixamorig:LeftHandMiddle3","J_Bip_L_Middle3");
            mapping.set("mixamorig:LeftHandThumb1","J_Bip_L_Thumb1");
            mapping.set("mixamorig:LeftHandThumb2","J_Bip_L_Thumb2");
            mapping.set("mixamorig:LeftHandThumb3","J_Bip_L_Thumb3");
            mapping.set("mixamorig:LeftHandPinky1","J_Bip_L_Little1");
            mapping.set("mixamorig:LeftHandPinky2","J_Bip_L_Little2");
            mapping.set("mixamorig:LeftHandPinky3","J_Bip_L_Little3");
            mapping.set("mixamorig:LeftHandRing1","J_Bip_L_Ring1");
            mapping.set("mixamorig:LeftHandRing2","J_Bip_L_Ring2");
            mapping.set("mixamorig:LeftHandRing3","J_Bip_L_Ring3");
            mapping.set("mixamorig:Neck","J_Bip_C_Neck");
            mapping.set("mixamorig:Head","J_Bip_C_Head");
            mapping.set("mixamorig:HeadTop_End","");
            mapping.set("mixamorig:HeadTop_End_end","");
            mapping.set("mixamorig:RightShoulder","J_Bip_R_Shoulder");
            mapping.set("mixamorig:RightArm","J_Bip_R_UpperArm");
            mapping.set("mixamorig:RightForeArm","J_Bip_R_LowerArm");
            mapping.set("mixamorig:RightHand","J_Bip_R_Hand");
            mapping.set("mixamorig:RightHandIndex1","J_Bip_R_Index1");
            mapping.set("mixamorig:RightHandIndex2","J_Bip_R_Index2");
            mapping.set("mixamorig:RightHandIndex3","J_Bip_R_Index3");
            mapping.set("mixamorig:RightHandMiddle1","J_Bip_R_Middle1");
            mapping.set("mixamorig:RightHandMiddle2","J_Bip_R_Middle2");
            mapping.set("mixamorig:RightHandMiddle3","J_Bip_R_Middle3");
            mapping.set("mixamorig:RightHandThumb1","J_Bip_R_Thumb1");
            mapping.set("mixamorig:RightHandThumb2","J_Bip_R_Thumb2");
            mapping.set("mixamorig:RightHandThumb3","J_Bip_R_Thumb3");
            mapping.set("mixamorig:RightHandPinky1","J_Bip_R_Little1");
            mapping.set("mixamorig:RightHandPinky2","J_Bip_R_Little2");
            mapping.set("mixamorig:RightHandPinky3","J_Bip_R_Little3");
            mapping.set("mixamorig:RightHandRing1","J_Bip_R_Ring1");
            mapping.set("mixamorig:RightHandRing2","J_Bip_R_Ring2");
            mapping.set("mixamorig:RightHandRing3","J_Bip_R_Ring3");
            
            return mapping;
        }   
    
        var createMappingForWebaverse = function(){
            var mapping = new Map(); 
            
            mapping.set("mixamorig:Hips","hips");
            mapping.set("mixamorig:LeftUpLeg","leftUpperLeg");
            mapping.set("mixamorig:LeftLeg","leftLowerLeg");
            mapping.set("mixamorig:LeftFoot","leftFoot");
            mapping.set("mixamorig:LeftToeBase","leftToes");
            mapping.set("mixamorig:LeftToe_End","toesL_end");
            mapping.set("mixamorig:LeftToe_End_end","toesL_end");
            mapping.set("mixamorig:RightUpLeg","rightUpperLeg");
            mapping.set("mixamorig:RightLeg","rightLowerLeg");
            mapping.set("mixamorig:RightFoot","rightFoot");
            mapping.set("mixamorig:RightToeBase","rightToes");
            mapping.set("mixamorig:RightToe_End","toesR_end");
            mapping.set("mixamorig:RightToe_End_end","toesR_end");
            mapping.set("mixamorig:Spine","spine");
            mapping.set("mixamorig:Spine1","");
            mapping.set("mixamorig:Spine2","");
            mapping.set("mixamorig:LeftShoulder","leftShoulder");
            mapping.set("mixamorig:LeftArm","leftUpperArm");
            mapping.set("mixamorig:LeftForeArm","leftLowerArm");
            mapping.set("mixamorig:LeftHand","leftHand");
            mapping.set("mixamorig:LeftHandIndex1","leftIndexProximal");
            mapping.set("mixamorig:LeftHandIndex2","leftIndexIntermediate");
            mapping.set("mixamorig:LeftHandIndex3","leftIndexDistal");
            mapping.set("mixamorig:LeftHandMiddle1","leftMiddleProximal");
            mapping.set("mixamorig:LeftHandMiddle2","leftMiddleIntermediate");
            mapping.set("mixamorig:LeftHandMiddle3","leftMiddleDistal");
            mapping.set("mixamorig:LeftHandThumb1","leftThumbMetacarpal");
            mapping.set("mixamorig:LeftHandThumb2","leftThumbProximal");
            mapping.set("mixamorig:LeftHandThumb3","leftThumbDistal");
            mapping.set("mixamorig:LeftHandPinky1","leftLittleProximal");
            mapping.set("mixamorig:LeftHandPinky2","leftLittleIntermediate");
            mapping.set("mixamorig:LeftHandPinky3","leftLittleDistal");
            mapping.set("mixamorig:LeftHandRing1","leftRingProximal");
            mapping.set("mixamorig:LeftHandRing2","leftRingIntermediate");
            mapping.set("mixamorig:LeftHandRing3","leftRingDistal");
            mapping.set("mixamorig:Neck","neck");
            mapping.set("mixamorig:Head","head");
            mapping.set("mixamorig:HeadTop_End","");
            mapping.set("mixamorig:HeadTop_End_end","");
            mapping.set("mixamorig:RightShoulder","rightShoulder");
            mapping.set("mixamorig:RightArm","rightUpperArm");
            mapping.set("mixamorig:RightForeArm","rightLowerArm");
            mapping.set("mixamorig:RightHand","rightHand");
            mapping.set("mixamorig:RightHandIndex1","rightIndexProximal");
            mapping.set("mixamorig:RightHandIndex2","rightIndexIntermediate");
            mapping.set("mixamorig:RightHandIndex3","rightIndexDistal");
            mapping.set("mixamorig:RightHandMiddle1","rightMiddleProximal");
            mapping.set("mixamorig:RightHandMiddle2","rightMiddleIntermediate");
            mapping.set("mixamorig:RightHandMiddle3","rightMiddleDistal");
            mapping.set("mixamorig:RightHandThumb1","rightThumbMetacarpal");
            mapping.set("mixamorig:RightHandThumb2","rightThumbProximal");
            mapping.set("mixamorig:RightHandThumb3","rightThumbDistal");
            mapping.set("mixamorig:RightHandPinky1","rightLittleProximal");
            mapping.set("mixamorig:RightHandPinky2","rightLittleIntermediate");
            mapping.set("mixamorig:RightHandPinky3","rightLittleDistal");
            mapping.set("mixamorig:RightHandRing1","rightRingProximal");
            mapping.set("mixamorig:RightHandRing2","rightRingIntermediate");
            mapping.set("mixamorig:RightHandRing3","rightRingDistal");
    
            return mapping;
        }

        var mappingForVroid = createMappingForVroid();
        var mappingForWebaverse = createMappingForWebaverse();

        var _remapBoneNameForVroid = function(boneNameToRemap){
            return mappingForVroid.get(boneNameToRemap);
        }
        
        var _remapBoneNameForWebaverse = function(boneNameToRemap){
            return mappingForWebaverse.get(boneNameToRemap);
        }

        result.remapBoneName = function(boneNameToRemap,familyName){
            if (babylonJsBoneMappingInfoJsonObject != null) {
                var characterFamilyBoneMapping = babylonJsBoneMappingInfoJsonObject['characterFamilyBoneMapping'][familyName];
                
                if (characterFamilyBoneMapping != null) {
                    if (boneNameToRemap.startsWith(MIXAMO_BONE_NAME_PREFIX) === false) {
                        return boneNameToRemap;
                    }
                    
                    
                    var boneNameToRemapWithoutPrefix = boneNameToRemap.substring(MIXAMO_BONE_NAME_PREFIX.length);
                    var remappedBoneName = characterFamilyBoneMapping[boneNameToRemapWithoutPrefix];
                    
                    
                    if (remappedBoneName != null) {
                        return remappedBoneName;
                    }
                    
                    
                    return boneNameToRemap;
                }
            }
            
            
            
            
            
            
            var remapped;

            if(familyName.toLowerCase()==="vroid"){
                remapped = _remapBoneNameForVroid(boneNameToRemap);
            }else if(familyName.toLowerCase()==="webaverse"){
                remapped = _remapBoneNameForWebaverse(boneNameToRemap);
            }

            if(remapped != null){
                return remapped;
            }

            return boneNameToRemap;
        }

        var mappingFromVroid = new Map(Array.from(mappingForVroid, a=>a.reverse()));
        var mappingFromWebaverse = new Map(Array.from(mappingForWebaverse, a=>a.reverse()));
        result.vroidToMixamo = function(boneName){
            return mappingFromVroid.get(boneName) || boneName; // seems most of bone are not mapped. Just return original boneName.
        }
        result.webaverseToMixamo = function(boneName){
            return mappingFromWebaverse.get(boneName) || boneName; // seems most of bone are not mapped. Just return original boneName.
        }

        return result;
    } 
    
    
    var boneNamesMapping = createBoneNamesMapping();
    
    BabylonJsBoneMapper['remapBoneName'] = function(boneNameToRemap, familyName) {
        return boneNamesMapping.remapBoneName(boneNameToRemap, familyName);
    };

    BabylonJsBoneMapper['vroidToMixamo'] = function(boneName){
        return boneNamesMapping.vroidToMixamo(boneName);
    };

    BabylonJsBoneMapper['webaverseToMixamo'] = function(boneName){
        return boneNamesMapping.webaverseToMixamo(boneName);
    };

    BabylonJsBoneMapper['ensureBoneNameInMixamo'] = function(boneName, characterFamilyName) {
        if (characterFamilyName === 'vroid') {
            return boneNamesMapping.vroidToMixamo(boneName);
        }
        
        
        if (characterFamilyName === 'webaverse') {
            return boneNamesMapping.webaverseToMixamo(boneName);
        }
        
        
        
        var characterFamilyBoneMapping = babylonJsBoneMappingInfoJsonObject['characterFamilyBoneMapping'][characterFamilyName];

        if (characterFamilyBoneMapping != null) {
            for (var unprefixedMixamoBoneName in characterFamilyBoneMapping) {
                if (characterFamilyBoneMapping.hasOwnProperty(unprefixedMixamoBoneName)) {
                    var mappedToCharacterFamilyBoneName = characterFamilyBoneMapping[unprefixedMixamoBoneName];
                    
                    if (mappedToCharacterFamilyBoneName === boneName) {
                        return MIXAMO_BONE_NAME_PREFIX + unprefixedMixamoBoneName;
                    }
                }
            }
        }
        
        
        return boneName;
    };
    
    
    function getCharacterFamilyDisplayBoneNamesForFamily(characterFamilyName) {
        if (babylonJsBoneMappingInfoJsonObject != null) {
            return babylonJsBoneMappingInfoJsonObject['characterFamilyDisplayBoneNames'][characterFamilyName];
        }
        
        
        return null;
    };
    

    BabylonJsBoneMapper['getCharacterFamilyDisplayBoneNames'] = function(characterFamilyName){
        var characterFamilyDisplayBoneNamesForFamily = getCharacterFamilyDisplayBoneNamesForFamily(characterFamilyName);
        
        if (characterFamilyDisplayBoneNamesForFamily != null) {
            return characterFamilyDisplayBoneNamesForFamily;
        }
        
        
        
        return null;
    };
    
    BabylonJsBoneMapper['getCharacterFamilyNameByBoneNames'] = function(boneNames, characterFamilyName){
        var characterFamilyDisplayBoneNamesForFamily = getCharacterFamilyDisplayBoneNamesForFamily(characterFamilyName);
        
        if (characterFamilyDisplayBoneNamesForFamily != null) {
            return characterFamilyName;
        }
        
        
        
        
        //case 1: mixamorig
        const isMixamorigCharacter = boneNames.some((eachBoneName)=>{
            return eachBoneName.startsWith(MIXAMORIG_FAMILY_NAME);
        });
        if(isMixamorigCharacter){
            return MIXAMORIG_FAMILY_NAME;
        }

        //case 2: vroid
        const isVroidCharacter = boneNames.some((eachBoneName)=>{
            return eachBoneName.startsWith('J_');
        });
        if(isVroidCharacter){
            return VROID_FAMILY_NAME;
        }

        //case 3: webaverse
        const isWebaverseCharacter = boneNames.includes('R_Jaw') || boneNames.includes('L_Jaw') || boneNames.includes('leftThumbMetacarpal') || boneNames.includes('rightThumbMetacarpal');
        if(isWebaverseCharacter){
            return WEBAVERSE_FAMILY_NAME;
        }

        console.error("Could not determine which family the character belongs to")
        return null;
    };
    
    BabylonJsBoneMapper['flipDirectionOfBoneName'] = function(boneName, characterFamilyName) {
        if (boneName.startsWith(MIXAMO_BONE_NAME_PREFIX)) {
            characterFamilyName = 'mixamo';
        }
        
        
        
        if (babylonJsBoneMappingInfoJsonObject != null) {
            var flippableBoneNames = babylonJsBoneMappingInfoJsonObject['flippableBoneNames'][characterFamilyName];
            
            if (flippableBoneNames != null) {
                var indexOfBoneName = flippableBoneNames.indexOf(boneName);
                
                if (indexOfBoneName >= 0) {
                    var indexOfFlippedBoneName = (function() {
                        if ((indexOfBoneName % 2) === 0) {
                            return indexOfBoneName + 1;
                        }
                        
                        
                        return indexOfBoneName - 1;
                    })();
                    
                    return flippableBoneNames[indexOfFlippedBoneName];
                }
            }
        }

        
        
        return boneName;
    };
})();