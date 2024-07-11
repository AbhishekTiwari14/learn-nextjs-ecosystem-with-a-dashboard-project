import {z} from "zod";
//1 Runtime type checking with zod
//ex. we have a fxn 'toString' which can take any DT as arg. , but we want to throw error if DT is not a number. bgy using number parser with z.number().


const numberParser = z.number(); 
export const toString = (num: unknown) => {
    const parsed = numberParser.parse(num);
    return String(parsed);
};

//2 Verifying unknown APIs

const PersonResult = z.object({
    id: z.number(),
    name: z.string()
});

export const fetchUserData = async (id: string) => {
    const data = await fetch("https://jsonplaceholder.typicode.com/" + id).then((res) =>
      res.json(),
    );
    //console.log(data[0]); // { id: 1, name: 'Leanne Graham', username: 'Bret', and much more }
    
    const parsedData = PersonResult.parse(data[0]);
    console.log(parsedData); // { id: 1, name: 'Leanne Graham' }
    
    return parsedData.name;
};

const naam = fetchUserData("users"); 'Leanne Graham'
console.log(naam);

