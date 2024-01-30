window.onload = function() {
    // Populate policy names in the grid
    const policyGrid = document.getElementById('policyGrid');
    const policies = ['Chubb Hospital Cash', 'Cardinal Care Waiver']; // Replace with actual policies
  
    policies.forEach(policy => {
      const policyLink = document.createElement('a');
      let policy_name_id = policy.toLowerCase().replace(/\s/g, '_');
      policyLink.href = `claims_analysis/${policy_name_id}/${policy_name_id}.html`;
      policyLink.textContent = policy;
      policyGrid.appendChild(policyLink);
    });
  };
  