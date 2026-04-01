import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-8 flex items-center gap-2 text-slate-600 hover:text-[#0F172A] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Button>
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Política de Privacidade</h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-4">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Introdução</h2>
            <p>
              A Plataforma Advogado 2.0 ("nós", "nosso" ou "Plataforma") está comprometida em proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, tratamos e protegemos as suas informações pessoais ao utilizar os nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Informações que Coletamos</h2>
            <p><strong>Dados Cadastrais:</strong> Nome completo, e-mail, CPF/CNPJ, telefone e senha (criptografada).</p>
            <p><strong>Localização:</strong> Coletamos dados de localização aproximada (via CEP e coordenadas) para possibilitar o match entre clientes e advogados próximos.</p>
            <p><strong>Dados Profissionais (para Advogados):</strong> Número da OAB, especialidades, mini bio e links profissionais.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Uso das Informações</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Possibilitar a conexão entre clientes e advogados por proximidade geográfica.</li>
              <li>Personalizar sua experiência na plataforma.</li>
              <li>Garantir a segurança e integridade da rede de profissionais.</li>
              <li>Enviar comunicações administrativas e atualizações de serviço.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Compartilhamento de Dados</h2>
            <p>
              O Advogado 2.0 não vende seus dados pessoais a terceiros. Os dados de contato (como WhatsApp) de advogados são exibidos publicamente ou para clientes interessados para facilitar a contratação direta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Seus Direitos (LGPD)</h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a acessar, corrigir, anonimizar ou excluir seus dados pessoais a qualquer momento através das configurações do seu perfil ou entrando em contato com nosso suporte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Segurança</h2>
            <p>
              Utilizamos medidas técnicas e administrativas avançadas para proteger seus dados, incluindo criptografia e protocolos de segurança rigorosos fornecidos pelo Supabase/PostgreSQL.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. Contato</h2>
            <p>
              Caso tenha dúvidas sobre esta política, entre em contato através do suporte disponível na plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
