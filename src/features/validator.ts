export default function validSeedPhrase (seedPhrase: string) {
    if(new Uint8Array(Buffer.from(seedPhrase)).length !== 32) {
        return `Вы ввели ${new Uint8Array(Buffer.from(seedPhrase)).length} символов. Пожалуйста, введите ровно 32 символа.`
    }
    return true
}