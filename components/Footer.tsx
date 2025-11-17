export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Research Hub</h3>
            <p className="text-gray-600 text-sm">
              A platform for data-driven scientific stories exploring the issues that shape our society.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Evidence-based research</li>
              <li>Scientific methodology</li>
              <li>Open data visualization</li>
              <li>Peer review process</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Writing guidelines</li>
              <li>Data sources</li>
              <li>Visualization tools</li>
              <li>Citation standards</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Research Hub. Committed to scientific integrity and open knowledge.</p>
        </div>
      </div>
    </footer>
  );
}
