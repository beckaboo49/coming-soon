#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class SystemicArchitectAPITester:
    def __init__(self, base_url="https://command-center-240.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_seed_data(self):
        """Test seeding initial data"""
        return self.run_test(
            "Seed Data",
            "POST",
            "api/seed",
            200
        )

    def test_get_posts(self):
        """Test getting all blog posts"""
        return self.run_test(
            "Get All Posts",
            "GET",
            "api/posts",
            200
        )

    def test_get_posts_by_tag(self):
        """Test filtering posts by tag"""
        success1, _ = self.run_test(
            "Get Posts by Tag - STRATEGY",
            "GET",
            "api/posts",
            200,
            params={"tag": "STRATEGY"}
        )
        
        success2, _ = self.run_test(
            "Get Posts by Tag - AUTOMATION",
            "GET",
            "api/posts",
            200,
            params={"tag": "AUTOMATION"}
        )
        
        success3, _ = self.run_test(
            "Get Posts by Tag - MONETIZATION",
            "GET",
            "api/posts",
            200,
            params={"tag": "MONETIZATION"}
        )
        
        return success1 and success2 and success3

    def test_get_single_post(self):
        """Test getting a single post by slug"""
        return self.run_test(
            "Get Single Post",
            "GET",
            "api/posts/ai-proof-content-systems",
            200
        )

    def test_get_resources(self):
        """Test getting all affiliate resources"""
        return self.run_test(
            "Get All Resources",
            "GET",
            "api/resources",
            200
        )

    def test_subscribe_email(self):
        """Test email subscription"""
        test_email = f"test_{datetime.now().strftime('%H%M%S')}@example.com"
        return self.run_test(
            "Email Subscription",
            "POST",
            "api/subscribe",
            200,
            data={"email": test_email}
        )

    def test_emailoctopus_lists(self):
        """Test EmailOctopus lists endpoint"""
        return self.run_test(
            "EmailOctopus Lists",
            "GET",
            "api/emailoctopus/lists",
            200
        )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Systemic Architect API Tests...")
        print("=" * 60)

        # Test basic connectivity
        self.test_root_endpoint()
        
        # Seed data first
        self.test_seed_data()
        
        # Test blog functionality
        self.test_get_posts()
        self.test_get_posts_by_tag()
        self.test_get_single_post()
        
        # Test resources
        self.test_get_resources()
        
        # Test email subscription
        self.test_subscribe_email()
        
        # Test EmailOctopus integration
        self.test_emailoctopus_lists()

        # Print results
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for failure in self.failed_tests:
                print(f"   - {failure.get('test', 'Unknown')}: {failure}")
        
        success_rate = (self.tests_passed / self.tests_run) * 100 if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = SystemicArchitectAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())