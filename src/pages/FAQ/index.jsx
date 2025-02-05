import { useState } from "react";
import Header from "../../components/Header.jsx";


const faqs = [
  {
    "question": "What is Dopot, and what does it do?",
    "answer": "Dopot is an open-source platform for decentralized reward crowdfunding and equity investment designed to simplify and secure investments using blockchain technology. Founded in 2020, it provides an alternative to traditional crowdfunding methods."
  },
  {
    "question": "How does Dopot differ from traditional crowdfunding platforms?",
    "answer": "Traditional crowdfunding can involve long waiting times, centralized authorities, and a lack of investment security. Dopot overcomes these barriers using blockchain-based smart contracts, offering instant refunds and low commissions for investors and project creators."
  },
  {
    "question": "What is Decentralized Reward Crowdfunding on Dopot?",
    "answer": "Decentralized Reward Crowdfunding allows investors to contribute funds and receive rewards in NFTs once the funding goal is reached. This system merges reward crowdfunding with decentralized finance (DeFi), offering a secure and transparent alternative to traditional methods."
  },
  {
    "question": "What is a smart contract, and how does it work on Dopot?",
    "answer": "A smart contract is a self-executing program stored on a blockchain that automatically enforces agreements. On Dopot, smart contracts lock investor funds until a project meets its funding goal, ensuring transparency and security for investors and project creators."
  },
  {
    "question": "What problem does Dopot solve for investors?",
    "answer": "Dopot reduces investors' risk by using smart contracts that lock funds until project goals are achieved. It also offers refunds if the project fails to meet its target, ensuring a safer investment environment."
  },
  {
    "question": "Why does Dopot use DAI for crowdfunding investments?",
    "answer": "DAI is a stablecoin pegged to the US dollar, providing a stable value for investments and protecting users from the price volatility of other cryptocurrencies like Bitcoin or Ethereum."
  },
  {
    "question": "Is there a guarantee that my investment is 100% safe?",
    "answer": "No investment is entirely risk-free, but Dopot minimizes risks by ensuring funds are only released when a project reaches its goal, offering refunds for unachieved goals, and preventing fraud through blockchain transparency."
  },
  {
    "question": "What makes Dopot an innovative crowdfunding platform?",
    "answer": "Dopot revolutionizes crowdfunding by using blockchain technology to eliminate bureaucracy, offering secure transactions via smart contracts, and providing low fees and transparency for investors and project creators."
  },
  {
    "question": "How does Dopot help new projects that lack liquidity?",
    "answer": "Dopot allows startups and new projects to raise funds without collateral or upfront capital. This system provides a secure and cost-effective method for innovators to access funding from global investors."
  },
  {
    "question": "What does 'MIT license' mean for Dopot?",
    "answer": "The MIT license is an open-source license that allows anyone to use, modify, and distribute Dopot's platform code freely, promoting transparency and collaboration within the community."
  },
  {
    "question": "Why was Dopot built on Arbitrum One?",
    "answer": "Arbitrum One is a blockchain scaling solution that enhances transaction speed and reduces costs. Dopot uses Arbitrum One to provide faster and cheaper transactions than traditional blockchain networks."
  },
  {
    "question": "What is Web3, and how is it different from Web2?",
    "answer": "Web3 is the next internet generation, using decentralized systems like blockchain for data storage and control. Unlike Web2, Web3 empowers users with full data ownership, eliminating centralized control by platform operators."
  },
  {
    "question": "What decentralized technologies does Dopot use?",
    "answer": "Dopot uses decentralized systems such as IPFS for secure data storage, Push Protocol for direct communication with investors, Aragon for DAO governance, Proof of Humanity for decentralized identity verification, and Unstoppable Domains for censorship-resistant access."
  },
  {
    "question": "How does Dopot ensure data security and privacy?",
    "answer": "Dopot uses IPFS to store data securely on a decentralized network, eliminating the need for centralized servers and ensuring the integrity and privacy of user information."
  },
  {
    "question": "What are smart contracts, and how does Dopot use them?",
    "answer": "Smart contracts are blockchain-based programs that automatically enforce agreements. On Dopot, smart contracts ensure that funds are only transferred once a project meets its funding goal, providing security and transparency for investors."
  },
  {
    "question": "Why does Dopot use Proof of Humanity?",
    "answer": "Dopot uses Proof of Humanity to verify users' identities, ensuring that only real individuals participate in crowdfunding campaigns. This decentralized identity system adds credibility and trust to the platform."
  },
  {
    "question": "What are Unstoppable Domains, and why are they important?",
    "answer": "Unstoppable Domains are blockchain-based domain names that provide censorship-resistant access to websites. Dopot uses these domains to ensure its platform remains decentralized and accessible."
  },
  {
    "question": "How does Dopot's use of Aragon benefit users?",
    "answer": "Aragon enables decentralized governance in Dopot by encouraging the community to make decisions transparently. This ensures that all platform activities, such as liquidity management and decision-making, are visible to all users."
  },
  {
    "question": "What is Reward Crowdfunding on Dopot?",
    "answer": "Reward Crowdfunding on Dopot allows users to invest in projects and receive rewards initially in the form of fungible tokens. Once the fundraising goal is met, these tokens are converted into NFTs, which can be traded or redeemed for real-world rewards."
  },
  {
    "question": "Can I get a refund if the crowdfunding goal is not met?",
    "answer": "If the crowdfunding campaign doesn't reach its target, you can request a refund by exchanging your fungible token for your original investment amount before the goal is met."
  },
  {
    "question": "What is Dopot's Equity Section?",
    "answer": "Dopot's Equity Section is in an experimental phase. It is designed to allow companies and startups to create decentralized autonomous organizations (DAOs) through smart contracts. While still subject to global regulatory developments, it aims to provide an alternative to traditional equity investment by leveraging blockchain technology for efficient, decentralized investing."
  },
  {
    "question": "How does Dopot ensure token price stability?",
    "answer": "Price stability is achieved by using Fast and Slow Liquidity Locks, which provide liquidity to the pool in proportion to token purchases. This mechanism prevents extreme volatility and ensures long-term price growth."
  },
  {
    "question": "What is the Treasury in Dopot Tokenomics?",
    "answer": "The Treasury (36 million DPT) is locked for two years and allocated for future platform developments, including the equity section. Every 30 days, 1 million DPT will be unlocked to cover emergencies or unforeseen expenses."
  },
  {
    "question": "What is Dopot's roadmap?",
    "answer": "Dopot's roadmap includes four main phases: Phase 1 (Launch of decentralized reward crowdfunding and liquidity pool), Phase Venus (Listing on Centralized Exchanges), Phase Earth (Decentralized equity launch), and Phase Moon (Global expansion and mass marketing)."
  },
  {
    "question": "What happens in the 'Venus' phase of the roadmap?",
    "answer": "In the 'Venus' phase, Dopot will list on centralized exchanges (CEX), allowing for broader access and increased liquidity for the token."
  },
  {
    "question": "What is the focus of the 'Earth' phase in Dopot's roadmap?",
    "answer": "The 'Earth' phase will focus on launching decentralized equity, providing a unique opportunity for users to invest in startups and projects via blockchain technology."
  },
  {
    "question": "What does the 'Moon' phase of Dopot's roadmap involve?",
    "answer": "The 'Moon' phase represents Dopot's global expansion and mass marketing efforts to increase platform adoption and attract users worldwide."
  }
]



export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // Filter FAQs based on search input
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header />
        </div>
        <div className="box">
          <div className="dopot-power">
            <h5 className="flex items-center justify-center gap-2">
              <img className="mr-2 mb-1 w-5 h-5" src="/assets/img/Icon.png" alt="Icon" />
              Faq
            </h5>
            <h1 className="text-4xl font-bold">FAQs</h1>
            <h5 className="text-gray-500">Find answers to the most common questions about Dopot.</h5>
          </div>
        </div>
      </main>
 
      <div className="box-token">
        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full p-3 pl-10 border border-gray-300 !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-[#f77e65] !focus:border-[#f77e65] !outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
     

    
      <div className="mt-6 space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="rounded-lg shadow-md bg-white">
              <button
                className="!mb-0 !w-full !flex !justify-between !items-center p-4 text-left font-semibold text-white !bg-[#eb5957] !hover:bg-[#e86d58] !transition-all !rounded-lg"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-2xl">{faq.question}</span>
                <span className="text-white !text-2xl">{openIndex === index ? "▲" : "▼"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-96 p-4" : "max-h-0 p-0"}`}>
                <p className="text-black !text-2xl mb-2">{faq.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black mt-3 text-center">No matching questions found.</p>
        )}
      </div>
      </div>

      
    </div>

  );
}
