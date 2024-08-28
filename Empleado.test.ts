import { Empleado,ReporteDeHoras,ReporteDeSalario } from "./Empleado";


describe('Creación Empleado', () => {
    it('Empleado con tarifa y horas bien', () =>{
        expect(new Empleado(20,3000)).toEqual(new Empleado(20,3000));
    })

    it('Empleado con sueldo y horas bien', () =>{
        expect(new Empleado(40,50000)).toEqual(new Empleado(40,50000));
    })

    it('Empleado no puede no tener tarifa y sueldo mensual ', () => {
        expect(() => new Empleado(20)).toThrow(Error);
        expect(() => new Empleado(15,0,0)).toThrow(Error);
    })

    it('Empleado no puede tener horas negativas realizadas' , () => {
        expect(() => new Empleado(-20)).toThrow(Error);
    })

    it('Empleado no puede tener tarifa negativa ', () => {
        expect(() => new Empleado(0,-20)).toThrow(Error);
    })

    it('Empleado no puede tener sueldo negativo ', () => {
        expect(() => new Empleado(0,0,-20)).toThrow(Error);
    })

})

describe('Calculo de Sueldo Empleado',() => {
    it('Empleado con tarifa por hora y horas realidas, se le calcula su sueldo', () =>{
        expect(new Empleado(40,3000).CalculoSalarioEmpleado()).toEqual(40*3000);
        expect(new Empleado(30,5000).CalculoSalarioEmpleado()).toEqual(5000*30);
    })

    it('Empleado con sueldo mensual y horas realidas, se le calcula su sueldo', () =>{
        expect(new Empleado(40,0,150000).CalculoSalarioEmpleado()).toEqual(150000);
        expect(new Empleado(40,0,200000).CalculoSalarioEmpleado()).toEqual(200000);
    })

    it('Empleado con sueldo mensual, se pasa al de horas',() => {
        let empleado1 = new Empleado(40,0,150000);
        expect(empleado1).toEqual(new Empleado(40,0,150000))
        empleado1 = empleado1.CambioDeSalario();
        expect(empleado1).toEqual(new Empleado(40,3750));
    })

    it('Empleado que cobra por hora, pasa a un sueldo mensual' , () => {
        let empleado1 = new Empleado(40,3750);
        expect(empleado1).toEqual(new Empleado(40,3750));
        empleado1 = empleado1.CambioDeSalario();
        expect(empleado1).toEqual(new Empleado(40,0,150000));
    })
    
})

describe('Reporte por salario', () => {

    it('Encabezado muestra correctamente', () =>{    
        const reporte = new ReporteDeSalario('26-08-2024','16:57 PM');

        expect(reporte.Encabezado()).toBe('Fecha : 26-08-2024 , Hora : 16:57 PM')    
    })

    it('Al contar con 3 empleados, se calcula el sueldo total gastado en ellos',() => {
        const reporte = new ReporteDeSalario('26-08-2024','16:57 PM');
        let empleado1 = new Empleado(40,0,150000);
        let empleado2 = new Empleado(40,3750,0);
        let empleado3 = new Empleado(40,0,120000);

        reporte.AgregarEmpleados(empleado1)
        reporte.AgregarEmpleados(empleado2)
        reporte.AgregarEmpleados(empleado3)

        expect(reporte.SalarioEmpleados()).toBe(420000)
    })

    it('Al contar con 3 empleados, uno de ellos se cambia de hora a mensual y se le cambia su tarifa', () =>{
        const reporte = new ReporteDeSalario('26-08-2024','16:57 PM');
        let empleado1 = new Empleado(40,0,150000);
        let empleado2 = new Empleado(40,3750,0);
        let empleado3 = new Empleado(40,0,120000);

        reporte.AgregarEmpleados(empleado1)
        reporte.AgregarEmpleados(empleado2)
        empleado3 = empleado3.CambioDeSalario();
        empleado3 = empleado3.setTarifa(3500);
        
        expect(empleado3.CalculoSalarioEmpleado()).toBe(140000)

        reporte.AgregarEmpleados(empleado3)

        expect(reporte.SalarioEmpleados()).toBe(440000)
    })
    
    it('Al contar con 0 empleados, el total será de 0', () =>{
        const reporte = new ReporteDeSalario('26-08-2024','16:57 PM');
        

        expect(reporte.SalarioEmpleados()).toBe(0)
    }) 


})

describe('Reporte por Hora', () => {

    it('Encabezado muestra correctamente', () =>{    
        const reporte = new ReporteDeSalario('26-08-2024','16:57 PM');
        expect(reporte.Encabezado()).toBe('Fecha : 26-08-2024 , Hora : 16:57 PM')
    })

    it('Al contar con 3 empleados, se calcula el total de horas',() => {
        const reporte = new ReporteDeHoras('26-08-2024','16:57 PM');
        let empleado1 = new Empleado(40,0,150000);
        let empleado2 = new Empleado(40,3750,0);
        let empleado3 = new Empleado(40,0,120000);

        reporte.AgregarEmpleados(empleado1)
        reporte.AgregarEmpleados(empleado2)
        reporte.AgregarEmpleados(empleado3)

        expect(reporte.HorasEmpleados()).toBe(120)
    })
    
    it('Al contar con 0 empleados, el total será de 0', () =>{
        const reporte = new ReporteDeHoras('26-08-2024','16:57 PM');
        expect(reporte.HorasEmpleados()).toBe(0)
    }) 

})

