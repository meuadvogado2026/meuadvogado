import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale } from "lucide-react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-8 flex items-center gap-2 text-slate-600 hover:text-[#0F172A] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Button>
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Scale className="w-6 h-6 text-[#0F172A]" />
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Termos de Uso</h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-4">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao utilizar a Plataforma Meu Advogado, você concorda em cumprir estes Termos de Uso. Caso não concorde com qualquer disposição, você não deve utilizar o serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Natureza do Serviço</h2>
            <p>
              O Meu Advogado é uma plataforma de conexão entre clientes e profissionais do direito. **Não somos um escritório de advocacia e não prestamos serviços jurídicos diretos.**
            </p>
            <p>
              A contratação de honorários, prazos e responsabilidades técnicas ocorre diretamente entre o cliente e o advogado através do WhatsApp ou outros meios de comunicação externa, sem intermediação da Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Responsabilidades do Advogado</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Manter o status da OAB regular e ativo.</li>
              <li>Prestar informações verídicas em seu perfil.</li>
              <li>Atender aos clientes com ética e profissionalismo conforme o Código de Ética da OAB.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Responsabilidades do Cliente</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Fornecer informações verídicas para o cadastro.</li>
              <li>Utilizar a plataforma apenas para fins lícitos.</li>
              <li>Respeitar os profissionais contatados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Limitação de Responsabilidade</h2>
            <p>
              A Plataforma não se responsabiliza por:
              - Negociações externas entre clientes e advogados;
              - O teor das orientações jurídicas prestadas pelos profissionais;
              - Indisponibilidade técnica temporária da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Modificações</h2>
            <p>
              Estes termos podem ser alterados a qualquer momento. O uso contínuo da plataforma após alterações implica na aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. Foro</h2>
            <p>
              Fica eleito o foro da comarca de Brasília/DF para dirimir quaisquer controvérsias oriundas destes Termos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
