import daybookRouter from "@/modules/daybook/router";

describe('Pruebas en el modulo de rutas del Daybook', () => {

    test('El router debe de tener esta cofiguracion', async () => {
    

        expect( daybookRouter ).toMatchObject({
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function ),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component:  expect.any( Function ),
                    props: expect.any( Function )
                }
            ]
        })


        // expect( (await daybookRouter.children[0].component()).default.name ).toBe('NoEntrySelected')
        // expect( (await daybookRouter.children[1].component()).default.name ).toBe('EntryView')

        const promiseRoutes = []
        daybookRouter.children.forEach(child => {
            promiseRoutes.push( child.component() )
        })

        const routes = (await Promise.all( promiseRoutes )).map( route => route.default.name )

        expect( routes ).toContain( 'EntryView' )
        expect( routes ).toContain( 'NoEntrySelected' )

    })

    test('Debe de retornar el id de la ruta', () => {
        const route = {
            params:{
                id: '123'
            }
        }

        const entryRoute = daybookRouter.children.find( element => element.name === 'entry' )
        expect(entryRoute.props( route )).toEqual({ id: '123' })
    })

})