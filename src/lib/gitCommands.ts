
export type GitCommand = {
  id: string;
  title: string;
  description: string;
  syntax: string;
  examples: {
    code: string;
    description: string;
  }[];
  tips?: string[];
};

export type GitCategory = {
  id: string;
  title: string;
  description: string;
  commands: GitCommand[];
};

export const gitCategories: GitCategory[] = [
  {
    id: "configuration",
    title: "Configuração Inicial",
    description: "Comandos para configurar suas preferências e identidade no Git.",
    commands: [
      {
        id: "git-config",
        title: "git config",
        description: "Configura as preferências do usuário, como nome e e-mail.",
        syntax: "git config [--global] <key> <value>",
        examples: [
          {
            code: "git config --global user.name \"Seu Nome\"",
            description: "Define seu nome para todos os repositórios"
          },
          {
            code: "git config --global user.email \"seuemail@example.com\"",
            description: "Define seu e-mail para todos os repositórios"
          },
          {
            code: "git config --list",
            description: "Lista todas as configurações"
          }
        ],
        tips: [
          "Use --global para aplicar a configuração a todos os repositórios",
          "Configure um editor de texto padrão com git config --global core.editor \"editor-command\""
        ]
      }
    ]
  },
  {
    id: "initialization",
    title: "Inicialização e Clonagem",
    description: "Comandos para iniciar um repositório ou clonar um existente.",
    commands: [
      {
        id: "git-init",
        title: "git init",
        description: "Inicializa um novo repositório Git no diretório atual.",
        syntax: "git init [directory]",
        examples: [
          {
            code: "git init",
            description: "Inicializa o repositório no diretório atual"
          },
          {
            code: "git init meu-projeto",
            description: "Cria um diretório 'meu-projeto' e inicializa um repositório dentro dele"
          }
        ],
        tips: [
          "Um arquivo .git oculto será criado para armazenar os metadados do repositório",
          "Para remover o controle de versão, basta excluir o diretório .git"
        ]
      },
      {
        id: "git-clone",
        title: "git clone",
        description: "Clona um repositório remoto existente para o seu ambiente local.",
        syntax: "git clone <repository> [directory]",
        examples: [
          {
            code: "git clone https://github.com/usuario/repositorio.git",
            description: "Clona o repositório para um diretório com o mesmo nome"
          },
          {
            code: "git clone https://github.com/usuario/repositorio.git minha-pasta",
            description: "Clona o repositório para o diretório especificado"
          },
          {
            code: "git clone --branch develop https://github.com/usuario/repositorio.git",
            description: "Clona o repositório obtendo apenas a branch 'develop'"
          }
        ],
        tips: [
          "Use --depth 1 para um clone superficial (apenas o commit mais recente)",
          "Para repositórios grandes, considere usar --single-branch para clonar apenas a branch necessária"
        ]
      }
    ]
  },
  {
    id: "basic-version-control",
    title: "Controle de Versão Básico",
    description: "Comandos essenciais para o fluxo de trabalho diário com Git.",
    commands: [
      {
        id: "git-add",
        title: "git add",
        description: "Adiciona arquivos ou alterações ao índice (staging area).",
        syntax: "git add <pathspec>",
        examples: [
          {
            code: "git add arquivo.txt",
            description: "Adiciona um arquivo específico ao stage"
          },
          {
            code: "git add .",
            description: "Adiciona todos os arquivos modificados ao stage"
          },
          {
            code: "git add *.js",
            description: "Adiciona todos os arquivos .js modificados"
          }
        ],
        tips: [
          "Use git add -p para adicionar partes específicas de um arquivo",
          "Use git add -u para adicionar apenas arquivos já rastreados (sem novos arquivos)"
        ]
      },
      {
        id: "git-status",
        title: "git status",
        description: "Exibe o estado atual do repositório, mostrando quais arquivos foram modificados, adicionados ou removidos.",
        syntax: "git status [options]",
        examples: [
          {
            code: "git status",
            description: "Mostra o status completo"
          },
          {
            code: "git status -s",
            description: "Mostra o status em formato reduzido"
          }
        ],
        tips: [
          "Use -b para mostrar informações da branch atual junto com o status",
          "Use --ignored para mostrar também arquivos ignorados"
        ]
      },
      {
        id: "git-commit",
        title: "git commit",
        description: "Registra as alterações no repositório com uma mensagem descritiva.",
        syntax: "git commit [options]",
        examples: [
          {
            code: "git commit -m \"Mensagem do commit\"",
            description: "Cria um commit com a mensagem especificada"
          },
          {
            code: "git commit -am \"Mensagem do commit\"",
            description: "Adiciona todos os arquivos rastreados modificados e cria um commit"
          },
          {
            code: "git commit --amend",
            description: "Modifica o último commit (adiciona alterações ou muda a mensagem)"
          }
        ],
        tips: [
          "Escreva mensagens claras e descritivas para facilitar o entendimento futuro",
          "Use o padrão convencional: 'tipo(escopo): mensagem', ex: 'feat(auth): adiciona login com Google'"
        ]
      }
    ]
  },
  {
    id: "history-viewing",
    title: "Visualização de Histórico",
    description: "Comandos para visualizar e analisar o histórico do repositório.",
    commands: [
      {
        id: "git-log",
        title: "git log",
        description: "Mostra o histórico de commits do repositório.",
        syntax: "git log [options]",
        examples: [
          {
            code: "git log",
            description: "Mostra o histórico completo de commits"
          },
          {
            code: "git log --oneline",
            description: "Mostra cada commit em uma única linha"
          },
          {
            code: "git log -p",
            description: "Mostra as diferenças introduzidas em cada commit"
          },
          {
            code: "git log --graph --oneline --all",
            description: "Mostra um gráfico do histórico incluindo todas as branches"
          }
        ],
        tips: [
          "Use --author=\"nome\" para filtrar commits por autor",
          "Use -n para limitar o número de commits mostrados"
        ]
      },
      {
        id: "git-diff",
        title: "git diff",
        description: "Exibe as diferenças entre commits, branches ou o estado atual do repositório.",
        syntax: "git diff [options] [commit] [--] [path]",
        examples: [
          {
            code: "git diff",
            description: "Mostra as mudanças não adicionadas ao stage"
          },
          {
            code: "git diff --staged",
            description: "Mostra as mudanças que estão no stage"
          },
          {
            code: "git diff HEAD~1 HEAD",
            description: "Mostra as diferenças entre o penúltimo e o último commit"
          }
        ],
        tips: [
          "Use git diff branch1..branch2 para comparar duas branches",
          "Adicione um caminho ao final para limitar a comparação a arquivos específicos"
        ]
      }
    ]
  },
  {
    id: "branches",
    title: "Branches (Ramificações)",
    description: "Comandos para trabalhar com branches, permitindo desenvolvimento paralelo.",
    commands: [
      {
        id: "git-branch",
        title: "git branch",
        description: "Lista, cria ou exclui branches.",
        syntax: "git branch [options] [branch-name]",
        examples: [
          {
            code: "git branch",
            description: "Lista todas as branches locais"
          },
          {
            code: "git branch nova-branch",
            description: "Cria uma nova branch"
          },
          {
            code: "git branch -d nome-da-branch",
            description: "Exclui uma branch (se já foi mesclada)"
          },
          {
            code: "git branch -D nome-da-branch",
            description: "Força a exclusão de uma branch (mesmo se não foi mesclada)"
          }
        ],
        tips: [
          "Use -a para listar todas as branches (locais e remotas)",
          "Use -v para ver o último commit em cada branch"
        ]
      },
      {
        id: "git-checkout",
        title: "git checkout",
        description: "Muda para uma branch específica ou restaura arquivos.",
        syntax: "git checkout [options] <branch|commit|file>",
        examples: [
          {
            code: "git checkout nome-da-branch",
            description: "Muda para a branch especificada"
          },
          {
            code: "git checkout -b nova-branch",
            description: "Cria uma nova branch e muda para ela"
          },
          {
            code: "git checkout -- arquivo.txt",
            description: "Desfaz alterações em um arquivo (restaura do último commit)"
          }
        ],
        tips: [
          "Use git checkout - para voltar à branch anterior",
          "O comando git switch é uma alternativa mais moderna para trocar de branch"
        ]
      },
      {
        id: "git-merge",
        title: "git merge",
        description: "Combina alterações de diferentes branches.",
        syntax: "git merge [options] <branch>",
        examples: [
          {
            code: "git merge feature-branch",
            description: "Mescla a 'feature-branch' na branch atual"
          },
          {
            code: "git merge --no-ff feature-branch",
            description: "Cria sempre um commit de merge, mesmo se fast-forward for possível"
          },
          {
            code: "git merge --abort",
            description: "Cancela um merge em andamento que gerou conflitos"
          }
        ],
        tips: [
          "Resolva conflitos editando os arquivos marcados e depois use git add seguido de git commit",
          "Use --squash para condensar todos os commits da branch em um único commit"
        ]
      }
    ]
  },
  {
    id: "remote-syncing",
    title: "Atualização e Sincronização",
    description: "Comandos para interagir com repositórios remotos.",
    commands: [
      {
        id: "git-fetch",
        title: "git fetch",
        description: "Baixa as alterações do repositório remoto sem integrá-las automaticamente.",
        syntax: "git fetch [remote] [branch]",
        examples: [
          {
            code: "git fetch origin",
            description: "Baixa as alterações do remote 'origin'"
          },
          {
            code: "git fetch --all",
            description: "Baixa as alterações de todos os remotes"
          },
          {
            code: "git fetch origin feature-branch",
            description: "Baixa apenas uma branch específica"
          }
        ],
        tips: [
          "Use git branch -a para ver as branches remotas após o fetch",
          "Compare com git diff origin/main para ver as diferenças antes de integrar"
        ]
      },
      {
        id: "git-pull",
        title: "git pull",
        description: "Baixa e integra as alterações do repositório remoto na branch atual.",
        syntax: "git pull [options] [remote] [branch]",
        examples: [
          {
            code: "git pull origin main",
            description: "Puxa e integra as alterações da branch 'main' do remote 'origin'"
          },
          {
            code: "git pull --rebase",
            description: "Puxa e reaplica seus commits locais sobre as alterações remotas"
          }
        ],
        tips: [
          "git pull é equivalente a git fetch seguido de git merge",
          "Use --rebase para manter o histórico mais limpo (evita commits de merge)"
        ]
      },
      {
        id: "git-push",
        title: "git push",
        description: "Envia as alterações locais para o repositório remoto.",
        syntax: "git push [options] [remote] [branch]",
        examples: [
          {
            code: "git push origin main",
            description: "Envia alterações da branch atual para a branch 'main' no remote 'origin'"
          },
          {
            code: "git push -u origin feature-branch",
            description: "Envia uma nova branch para o remoto e configura tracking"
          },
          {
            code: "git push --force",
            description: "Força o push (cuidado: pode sobrescrever alterações remotas)"
          }
        ],
        tips: [
          "Use --force-with-lease para um push forçado mais seguro (verifica se não há trabalho novo)",
          "Use -u (--set-upstream) na primeira vez que enviar uma nova branch"
        ]
      }
    ]
  },
  {
    id: "undoing-changes",
    title: "Reversão e Reset",
    description: "Comandos para desfazer alterações no repositório.",
    commands: [
      {
        id: "git-reset",
        title: "git reset",
        description: "Desfaz commits ou remove alterações da área de staging.",
        syntax: "git reset [options] [commit]",
        examples: [
          {
            code: "git reset --soft HEAD~1",
            description: "Remove o último commit, mantendo as alterações no staging"
          },
          {
            code: "git reset --mixed HEAD~1",
            description: "Remove o último commit, mantendo as alterações sem staging (padrão)"
          },
          {
            code: "git reset --hard HEAD~1",
            description: "Remove o último commit e todas as alterações (cuidado!)"
          },
          {
            code: "git reset arquivo.txt",
            description: "Remove um arquivo do staging (mantém modificações)"
          }
        ],
        tips: [
          "Use git reflog para encontrar commits que foram 'perdidos' após um reset",
          "--hard é destrutivo e não pode ser desfeito facilmente, use com cautela"
        ]
      },
      {
        id: "git-revert",
        title: "git revert",
        description: "Cria um novo commit que desfaz um commit anterior.",
        syntax: "git revert [options] <commit>",
        examples: [
          {
            code: "git revert abc123",
            description: "Cria um novo commit que desfaz as alterações do commit abc123"
          },
          {
            code: "git revert HEAD",
            description: "Desfaz o último commit"
          },
          {
            code: "git revert --no-commit HEAD~3..HEAD",
            description: "Reverte múltiplos commits sem criar commits automaticamente"
          }
        ],
        tips: [
          "Mais seguro que reset para desfazer alterações já compartilhadas",
          "Use --no-commit para fazer todas as reversões e depois criar um único commit"
        ]
      }
    ]
  },
  {
    id: "temporary-storage",
    title: "Stash (Armazenamento Temporário)",
    description: "Comandos para salvar temporariamente alterações sem criar commits.",
    commands: [
      {
        id: "git-stash",
        title: "git stash",
        description: "Salva temporariamente as alterações não commitadas para limpar o diretório de trabalho.",
        syntax: "git stash [command]",
        examples: [
          {
            code: "git stash",
            description: "Salva todas as alterações rastreadas e não commitadas"
          },
          {
            code: "git stash save \"mensagem descritiva\"",
            description: "Salva alterações com uma mensagem"
          },
          {
            code: "git stash list",
            description: "Lista todos os stashes salvos"
          },
          {
            code: "git stash apply",
            description: "Aplica o stash mais recente sem removê-lo"
          },
          {
            code: "git stash pop",
            description: "Aplica o stash mais recente e o remove da lista"
          },
          {
            code: "git stash drop stash@{n}",
            description: "Remove um stash específico"
          },
          {
            code: "git stash clear",
            description: "Remove todos os stashes"
          }
        ],
        tips: [
          "Use --include-untracked para incluir novos arquivos não rastreados",
          "Use git stash show stash@{n} para ver o conteúdo de um stash específico"
        ]
      }
    ]
  },
  {
    id: "tagging",
    title: "Tags",
    description: "Comandos para marcar pontos específicos na história do repositório.",
    commands: [
      {
        id: "git-tag",
        title: "git tag",
        description: "Marca pontos específicos na história do repositório, geralmente usados para releases.",
        syntax: "git tag [options] <tagname> [commit]",
        examples: [
          {
            code: "git tag v1.0",
            description: "Cria uma tag leve no commit atual"
          },
          {
            code: "git tag -a v1.0 -m \"Versão 1.0\"",
            description: "Cria uma tag anotada com mensagem"
          },
          {
            code: "git tag",
            description: "Lista todas as tags"
          },
          {
            code: "git tag -d v1.0",
            description: "Remove uma tag local"
          },
          {
            code: "git push origin v1.0",
            description: "Envia uma tag específica para o repositório remoto"
          },
          {
            code: "git push origin --tags",
            description: "Envia todas as tags para o repositório remoto"
          }
        ],
        tips: [
          "Tags anotadas (-a) contêm metadados e são recomendadas para releases",
          "Use git checkout v1.0 para visualizar o código no ponto da tag"
        ]
      }
    ]
  },
  {
    id: "remotes",
    title: "Remotos",
    description: "Comandos para gerenciar conexões com repositórios remotos.",
    commands: [
      {
        id: "git-remote",
        title: "git remote",
        description: "Gerencia conexões com repositórios remotos.",
        syntax: "git remote [command]",
        examples: [
          {
            code: "git remote",
            description: "Lista os remotes configurados"
          },
          {
            code: "git remote -v",
            description: "Lista os remotes com suas URLs"
          },
          {
            code: "git remote add origin https://github.com/usuario/repo.git",
            description: "Adiciona um novo remote"
          },
          {
            code: "git remote rename origin upstream",
            description: "Renomeia um remote"
          },
          {
            code: "git remote remove upstream",
            description: "Remove um remote"
          },
          {
            code: "git remote set-url origin https://github.com/usuario/novo-repo.git",
            description: "Muda a URL de um remote"
          }
        ],
        tips: [
          "Normalmente o remote principal é chamado 'origin', mas você pode usar qualquer nome",
          "Em projetos forked, é comum ter 'origin' apontando para seu fork e 'upstream' para o repositório original"
        ]
      }
    ]
  }
];
