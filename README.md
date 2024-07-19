This project is a roadmap on how to over-engineer a software application.

1. Working? Good
   - Folder Structure
     - Infrastructure-Driven
     - Framework-Driven
   - Full Stack SSR
     - Monorepo
     - Framework based
     - Next.js w/ server actions
   - [Commit](https://github.com/TiagoJacintoDev/over-engineered-erp/tree/2fea090a32eafa4e83998babce0ae2511ede0223)
2. Separating the frontend from the backend
   - Frontend
     - React as a Framework
   - Backend
     - Transaction Script
   - Repository Distribution
     - PNPM Monorepo w/o shared code
   - [From Commit](https://github.com/TiagoJacintoDev/over-engineered-erp/tree/71bb5d0b25f421286c566033a512822a4ff39333) | [To Commit](https://github.com/TiagoJacintoDev/over-engineered-erp/tree/dae2a525c5481de9493864bc67954cd113d58e5e)
3. Improving code quality and consistency
   - Linting
     - ESLint
   - Type checking
     - Typescript
   - Styling
     - Prettier
     - Editor Config
   - [From Commit](https://github.com/TiagoJacintoDev/over-engineered-erp/tree/52613c23f2f5ef7cdca5c46241a504ac23951f37) | [To Commit](https://github.com/TiagoJacintoDev/over-engineered-erp/tree/af5dbb9f0186ce4032bda55c2acb20e5a09715bc)
4. Changing the backend architecture
   - Architectural Patterns
     - Modular Monolith
     - Hexagonal
       - Implementations for this architecture vary a lot
       - My best explanation for this architecture is this:
         1. Incoming Adapter (Controller): Receives requests from the outside and adapts them to the incoming port API.
         2. Incoming Port (Use Case): Processes incoming data, checks for domain invariants (does business logic), and calls outgoing ports.
         3. Outgoing Port (Repository, External service): Retrieves core/domain objects (is the interface of the outgoing adapter).
         4. Outgoing Adapter (Concrete Repository): Adapts the data from the incoming port and sends requests to the outside world.
     - [From Commit](https://github.com/TiagoJacintoDev/over-engineered-erp/tree/2b0e08377f318d524f1445d1698808901b7afbed) | [To Commit](https://github.com/TiagoJacintoDev/over-engineered-erp/tree/c8d7cb21110c1d8bcc93c29d83ad0b577e3ddbd3)
