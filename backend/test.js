
import bcrypt from "bcrypt";



const password = "12345"

const hashedPassword = await bcrypt.hash(password, 10);

console.log(hashedPassword)

const passwordCorrect = await bcrypt.compare(password, hashedPassword);

console.log(passwordCorrect)