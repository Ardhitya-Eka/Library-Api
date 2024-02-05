import { IsNotEmpty, IsString } from "class-validator"

export class Signup {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
  
  @IsString()
  @IsNotEmpty()
  name: string
}

export class Signin {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}