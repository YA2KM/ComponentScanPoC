import { container } from 'tsyringe';

export function ClaroInject(name: string) {
    return function(target: any) {
        container.register(name, target)
    }
}
