import re

with open(r'i:\Proj\Metapoise\src\app\events\page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('border-white/30 relative transition-transform', 'border-white/30 group-hover:border-black relative transition-all')
text = text.replace('border-white/30 transform -translate-x-4', 'border-white/30 group-hover:border-black transition-colors transform -translate-x-4')
text = text.replace('text-white" fill="none"', 'text-white group-hover:text-black transition-colors" fill="none"')
text = text.replace('text-white" viewBox="', 'text-white group-hover:text-black transition-colors" viewBox="')
text = text.replace('border-white/30 border-dashed', 'border-white/30 group-hover:border-black transition-colors border-dashed')
text = text.replace('bg-black rounded-full border-4 border-white/30', 'bg-black group-hover:bg-white rounded-full border-4 border-white/30 group-hover:border-black transition-colors')
text = text.replace('border-white/30 rounded-full"></div>', 'border-white/30 group-hover:border-black transition-colors rounded-full"></div>')
text = text.replace('border-white/30 rounded-full flex', 'border-white/30 group-hover:border-black transition-colors rounded-full flex')
text = text.replace('bg-black rounded-full"></div>', 'bg-black group-hover:bg-white transition-colors rounded-full"></div>')
text = text.replace('border-white/30 flex', 'border-white/30 group-hover:border-black transition-colors flex')
text = text.replace('bg-black rounded-full relative z-10', 'bg-black group-hover:bg-white transition-colors rounded-full relative z-10')
text = text.replace('text-white animate-spin-slow', 'text-white group-hover:text-black transition-colors animate-spin-slow')

with open(r'i:\Proj\Metapoise\src\app\events\page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated events icons hover states.')
