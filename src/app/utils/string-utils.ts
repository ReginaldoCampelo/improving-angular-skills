export class StringUtils {
    public static isNullOrEmpty(value: string): boolean {
        if(value === null || value === undefined || value.trim() === '') {
            return true;
        }
        return false;
    };

    public static somenteNumeros(numero: string): string {
        return numero.replace(/[^0-9]/g, '');
    }
}