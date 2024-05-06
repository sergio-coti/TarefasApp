import { Routes } from '@angular/router';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { CriarUsuarioComponent } from './components/pages/criar-usuario/criar-usuario.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CriarTarefasComponent } from './components/admin/criar-tarefas/criar-tarefas.component';
import { ConsultarTarefasComponent } from './components/admin/consultar-tarefas/consultar-tarefas.component';
import { EditarTarefasComponent } from './components/admin/editar-tarefas/editar-tarefas.component';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/unauth.guard';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'pages/criar-usuario',
        component: CriarUsuarioComponent,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'admin/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/criar-tarefas',
        component: CriarTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/consultar-tarefas',
        component: ConsultarTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/editar-tarefas/:id',
        component: EditarTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'errors/not-found',
        component: NotFoundComponent
    },
    {        
        path: '', /* mapeamento da rota raiz do projeto */
        pathMatch: 'full', /* exatamente na url raiz */
        redirectTo: '/pages/autenticar-usuario'
    },
    {
        path: '**', /* mapeamento para erro 404 (página não encontrada) */
        redirectTo: '/errors/not-found'
    }
];
