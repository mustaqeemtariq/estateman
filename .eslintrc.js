module.exports = {
	plugins: ['@typescript-eslint/eslint-plugin', 'react', 'prettier', 'react-hooks'],
	parser: '@typescript-eslint/parser',
	extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parserOptions: {
	  ecmaVersion: 2021,
	  sourceType: 'module',
	  ecmaFeatures: {
		jsx: true
	  }
	},
	rules: {
	  // Prettier
	  'prettier/prettier': [
		'warn',
		{
		  endOfLine: 'auto'
		}
	  ],
	  // Naming conventions
	  '@typescript-eslint/naming-convention': [
		'error',
		{
		  selector: 'default',
		  format: ['camelCase']
		},
		{
		  selector: 'variable',
		  format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
		  leadingUnderscore: 'allow'
		},
		{
		  selector: 'typeLike',
		  format: ['PascalCase']
		}
	  ],
	  // React
	  'react/prop-types': [0],
	  'react/display-name': ['warn'],
	  'react/no-unescaped-entities': ['warn'],
	  'react/no-deprecated': ['warn'],
	  'react/jsx-key': ['warn'],
	  'react-hooks/rules-of-hooks': 'error',
	  'react-hooks/exhaustive-deps': 'warn',
	  // TypeScript
	  '@typescript-eslint/explicit-module-boundary-types': [0],
	  '@typescript-eslint/member-delimiter-style': [
		'error',
		{
		  multiline: {
			delimiter: 'none'
		  }
		}
	  ],
	  '@typescript-eslint/explicit-function-return-type': [
		'warn',
		{
		  allowExpressions: true,
		  allowTypedFunctionExpressions: true
		}
	  ],
	  '@typescript-eslint/no-unused-vars': [
		'warn',
		{
		  argsIgnorePattern: '^_',
		  varsIgnorePattern: '^_'
		}
	  ],
	  '@typescript-eslint/no-empty-function': ['warn'],
	  '@typescript-eslint/no-non-null-assertion': [0],
	  '@typescript-eslint/no-explicit-any': [0],
	  '@typescript-eslint/no-floating-promises': ['warn'],
	  // Other
	  'prefer-const': ['warn', { destructuring: 'all' }],
	  'no-console': ['warn', { allow: ['warn', 'error'] }],
	  'no-param-reassign': ['error', { props: false }],
	  'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
	  'import/prefer-default-export': [0],
	  'import/no-unresolved': [0],
	  'import/extensions': [0],
	  'import/order': [
		'error',
		{
		  'newlines-between': 'always',
		  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
		  pathGroups: [
			{
			  pattern: '@/**',
			  group: 'internal'
			}
		  ]
		}
	  ]
	},
	settings: {
	  react: {
		version: 'detect'
	  }
	}
  };
  