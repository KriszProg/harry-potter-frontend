import React, { useState, useEffect } from 'react';
import Content from "../styled_components/Content";
import {EditLabel, EditInput, EditSelect} from '../styled_components/CharacerEditComponents';
import Datafetcher from '../service/Datafetcher';


export default function CharacterEdit(props) {
    const [characterDetails, setCharacterDetails] = useState();
    const dataFetcher = new Datafetcher();
    const [core, setCore] = useState("");
    const [house, setHouse] = useState("");
    const [blood, setBlood] = useState("");
    const [species, setSpecies] = useState("");
    const [animagus, setAnimagus] = useState("");
    const [school, setSchool] = useState("");
    const [dumbledoresArmy, setDumledoresArmy] = useState(false);
    const [orderOfThePhoenix, setOrderOfThePhoenix] = useState(false);
    const [deathEater, setDeathEater] = useState(false);
    const [ministryOfMagic, setMinistryOfMagic] = useState(false);
    
    
    useEffect(() => {
        dataFetcher.fetchWithTokenHeader(
            `http://localhost:8080/character/${props.match.params.id}`,
            setCharacterDetails
            );
        }, [props]);
        
    useEffect(() => {
        if (characterDetails && characterDetails !== "denied") {
            console.log(characterDetails)
            if (characterDetails.wand != null) {
                setCore(characterDetails.wand.split(", ")[2]);
            }
            if (characterDetails.house != null) {
                setHouse(characterDetails.house);
            } 
            if (characterDetails.bloodStatus != null) {
                setBlood(characterDetails.bloodStatus);
            }
            if (characterDetails.species != null) {
                setSpecies(characterDetails.species);
            }
            if (characterDetails.animagus != null) {
                setAnimagus(characterDetails.animagus);
            }
            if (characterDetails.school != null) {
                setSchool(characterDetails.school);
            }
            setDumledoresArmy(characterDetails.dumbledoresArmy)
            setOrderOfThePhoenix(characterDetails.orderOfThePhoenix)
            setDeathEater(characterDetails.deathEater)
            setMinistryOfMagic(characterDetails.ministryOfMagic)
        }
    }, [characterDetails])
    
    function handleChangeCore(event) {
        setCore(event.target.value);
    }
    function handleChangeBlood(event) {
        setBlood(event.target.value);
    }
    function handleChangeSpecies(event) {
        setSpecies(event.target.value);
    }
    function handleChangeAnimagus(event) {
        setAnimagus(event.target.value);
    }
    function handleChangeHouse(event) {
        setHouse(event.target.value);
    }
    function handleChangeSchool(event) {
        setSchool(event.target.value);
    }
    function handleChangeDumbledor(event) {
        setDumledoresArmy(event.target.value);
    }
    function handleChangePhoenix(event) {
        setOrderOfThePhoenix(event.target.value);
    }
    function handleChangeDeathEater(event) {
        setDeathEater(event.target.value);
    }
    function handleChangeMinistry(event) {
        setMinistryOfMagic(event.target.value);
    }
    
    function submitHandler(event) {
        event.preventDefault();
        let object = {
            name : `${event.target[0].value}`,
            alias : `${event.target[1].value}`,
            boggart : `${event.target[2].value}`,
            patronus : `${event.target[3].value}`,
            role : `${event.target[4].value}`,
            wand : `${event.target[5].value}, ${event.target[6].value}, ${event.target[7].value}`,
            house : `${event.target[8].value}`,
            bloodStatus : `${event.target[9].value}`,
            species : `${event.target[10].value}`,
            animagus : `${event.target[11].value}`,
            school : `${event.target[12].value}`,
            dumbledoresArmy : `${event.target[13].checked}`,
            deathEater : `${event.target[14].checked}`,
            orderOfThePhoenix : `${event.target[15].checked}`,
            ministryOfMagic : `${event.target[16].checked}`,
        };
        console.log(object)
        dataFetcher.editCharacter(`http://localhost:8080/character/${props.match.params.id}/edit`, object);

    }
    if (characterDetails && characterDetails !== "denied") {
        
        let wandParts = ["", "", ""]
        if (characterDetails.wand != null) {
            wandParts = characterDetails.wand.split(", ")
        }
        return (
            <Content>
            <form onSubmit={submitHandler}>
                <EditLabel>Name</EditLabel>
                <input type="text" id="name" name="name" defaultValue={characterDetails.name}></input>
                <br></br>
                <EditLabel>Alias</EditLabel>
                <input type="text" id="alias" name="alias" defaultValue={characterDetails.alias}></input>
                <br></br>
                <EditLabel>Boggart</EditLabel>
                <input type="text" id="boggart" name="boggart" defaultValue={characterDetails.boggart}></input>
                <br></br>
                <EditLabel>Patronus</EditLabel>
                <input type="text" id="patronus" name="patrnous" defaultValue={characterDetails.patronus}></input>
                <br></br>
                <EditLabel>Role</EditLabel>
                <input type="text" id="role" name="role" defaultValue={characterDetails.role}></input>
                <br></br>
                <EditLabel>Wand wood</EditLabel>
                <input type="text" id="wandWood" name="wandWood" defaultValue={wandParts[0]}></input>
                <br></br>
                <EditLabel>Wand length</EditLabel>
                <input type="text" id="wandLength" name="wandLength" defaultValue={wandParts[1]}></input>
                <br></br>
                <EditLabel>Wand core</EditLabel>
                <select id="wandCore" name="wandCore" value={core} onChange={handleChangeCore}>
                    <option value="Dragon heartstring">Dragon heartstring</option>
                    <option value="Phoenix feather">Phoenix feather</option>
                    <option value="Phoenix feather core">Phoenix feather core</option>
                    <option value="Thestral tail hair">Thestral tail hair</option>
                    <option value="Thestral tail hair core">Thestral tail hair core</option>
                    <option value="Unicorn hair">Unicorn hair</option>
                    <option value="Unicorn hair tail">Unicorn hair tail</option>
                    <option value="Veela hair">Veela hair</option>
                    <option value="unknown core">unknown core</option>
                    <option value="">none/unknown</option>
                </select><br></br>
                <EditLabel>House</EditLabel>
                <select id="house" name="house" value={house} onChange={handleChangeHouse}>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                    <option value="Slytherin">Slytherin</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                    <option value="">none</option>
                </select>
                <br></br>
                <EditLabel>Blood</EditLabel>
                <select id="bloodStatus" name="bloodStatus" value={blood} onChange={handleChangeBlood}>
                    <option value="unknown">unknown</option>
                    <option value="half-blood">half-blood</option>
                    <option value="half-giant">half-giant</option>
                    <option value="mugglen">muggle</option>
                    <option value="muggle-born">muggle-born</option>
                    <option value="pure-blood">pure-blood</option>
                    <option value="quarter-villa">quarter-villa</option>
                    <option value="squib">squib</option>
                    <option value="">none</option>
                </select>
                <br></br>
                <EditLabel>Species</EditLabel>
                <select id="species" name="species" value={species} onChange={handleChangeSpecies}>
                    <option value="acromantula">acromantula</option>
                    <option value="Boarhound">Boarhound</option>
                    <option value="cat">cat</option>
                    <option value="centaur">centaur</option>
                    <option value="ghost">ghost</option>
                    <option value="giant">giant</option>
                    <option value="goblin">goblin</option>
                    <option value="Great Grey Owl">Great Grey Owl</option>
                    <option value="half-giant">half-giant</option>
                    <option value="hippogriff">hippogriff</option>
                    <option value="horcrux">horcrux</option>
                    <option value="house-elf">house-elf</option>
                    <option value="human">human</option>
                    <option value="human (metamorphmagus)">human (metamorphmagus)</option>
                    <option value="Norwegian Ridgeback">Norwegian Ridgeback</option>
                    <option value="part-goblin">part-goblin</option>
                    <option value="part-human">part-human</option>
                    <option value="phoenix">phoenix</option>
                    <option value="poltergeist">poltergeist</option>
                    <option value="portrait">portrait</option>
                    <option value="scops owl">scops owl</option>
                    <option value="Snowy Owl">Snowy Owl</option>
                    <option value="three-headed dog">three-headed dog</option>
                    <option value="toad">toad</option>
                    <option value="werewolf">werewolf</option>
                    <option value="">unknown</option>
                </select>
                <br></br>
                <EditLabel>Animagus</EditLabel>
                <select id="animagus" name="animagus" value={animagus} onChange={handleChangeAnimagus}>
                    <option value="beetle">beetle</option>
                    <option value="black dog">black dog</option>
                    <option value="rat">rat</option>
                    <option value="stag">stag</option>
                    <option value="tabby cat">tabby cat</option>
                    <option value="">none</option>
                </select>
                <br></br>
                <EditLabel>School</EditLabel>
                <select id="school" name="school" value={school} onChange={handleChangeSchool}>
                    <option value="Beauxbatons Academy of Magic">Beauxbatons Academy of Magic</option>
                    <option value="Durmstrang Institute">Durmstrang Institute</option>
                    <option value="Hogwarts Academy of Witchcraft and Wizardry">Hogwarts Academy of Witchcraft and Wizardry</option>
                    <option value="Hogwarts School of Witchcraft and Wizardry">Hogwarts School of Witchcraft and Wizardry</option>
                    <option value="">none</option>
                </select>
                <br></br>

                <EditLabel>Part of Dumbeldore's army</EditLabel>
                <input type="checkbox" id="dumbledoresArmy" name="dumbledoresArmy" checked={dumbledoresArmy} onChange={handleChangeDumbledor}></input><br></br>
                <EditLabel>Death Eater</EditLabel>
                <input type="checkbox" id="deathEater" name="deathEater" checked={deathEater} onChange={handleChangeDeathEater}></input><br></br>
                <EditLabel>Part of Order of the Phoenix</EditLabel>
                <input type="checkbox" id="orderOfThePhoenix" name="orderOfThePhoenix" checked={orderOfThePhoenix} onChange={handleChangePhoenix}></input><br></br>
                <EditLabel>Part of the Ministry of Magic</EditLabel>
                <input type="checkbox" id="ministryOfMagic" name="ministryOfMagic" checked={ministryOfMagic} onChange={handleChangeMinistry}></input><br></br>
                
                <button type="submit">SUBMIT</button>
            </form>
        </Content>
    )
} else {
    return (
        <Content>

        </Content>
    )
}
}
